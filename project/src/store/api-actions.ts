import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, store } from '.';
import { APIRoute, AuthorizationStatus } from '../constants';
import { errorHandle } from '../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offer';
import { Review, NewReview } from '../types/review';
import { UserData } from '../types/user-data';
import { loadOffers, loadRoom, loadOffersNearby, loadReviews, loadFavorites, setFavorites } from './data-process/data-process';
import { requireAuthorization, setUserName } from './user-process/user-process';

const FETCH_OFFER_ACTION = 'data/fetchOffers';
const FETCH_REVIEWS_ACTION = 'data/fetchReviews';
const ADD_REVIEW_ACTION = 'data/addReview';
const FETCH_OFFERS_NEARBY_ACTION = 'data/fetchOffersNearby';
const FETCH_FAVORITES_ACTION = 'data/loadFavorites';
const SET_FAVORITES_ACTION = 'data/setFavorites';
const CHECK_AUTH = 'user/checkAuth';
const USER_LOGIN = 'user/login';
const USER_LOGOUT = 'user/logout';

export const fetchOfferAction = createAsyncThunk(
  FETCH_OFFER_ACTION,
  async (id: number | null = null) => {
    try {
      if (id === null) {
        const { data } = await api.get<Offer[]>(APIRoute.Offers);
        store.dispatch(loadOffers(data));
      } else {
        const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
        store.dispatch(loadRoom(data));
      }
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOffersNearbyAction = createAsyncThunk(
  FETCH_OFFERS_NEARBY_ACTION,
  async (id: number | null = null) => {
    try {
      const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
      store.dispatch(loadOffersNearby(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  FETCH_REVIEWS_ACTION,
  async (id: number | null = null) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
      store.dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addReviewAction = createAsyncThunk(
  ADD_REVIEW_ACTION,
  async ({ comment, rating, roomId }: NewReview) => {
    try {
      const { data } = await api.post<Review[]>(`${APIRoute.Reviews}/${roomId}`, { comment, rating });
      store.dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const setFavoritesAction = createAsyncThunk(
  SET_FAVORITES_ACTION,
  async ({ id, isFavorite }: Offer) => {
    try {
      const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${Number(isFavorite)}`);
      store.dispatch(setFavorites(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk(
  FETCH_FAVORITES_ACTION,
  async () => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorite);
      store.dispatch(loadFavorites(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  CHECK_AUTH,
  async () => {
    try {
      const { data: { email } } = await api.get<UserData>(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(setUserName(email));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  USER_LOGIN,
  async ({ email, password }: AuthData) => {
    try {
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(setUserName(email));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  USER_LOGOUT,
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(setUserName(''));
    } catch (error) {
      errorHandle(error);
    }
  },
);
