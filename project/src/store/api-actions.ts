import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus } from '../constants';
import { errorHandle } from '../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offer';
import { Review, NewReview } from '../types/review';
import { AppDispatch, State } from '../types/state';
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

export const fetchOfferAction = createAsyncThunk<void, number | null | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  FETCH_OFFER_ACTION,
  async (id = null, { dispatch, extra: api }) => {
    try {
      if (id === null) {
        const { data } = await api.get<Offer[]>(APIRoute.Offers);
        dispatch(loadOffers(data));
      } else {
        const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
        dispatch(loadRoom(data));
      }
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<void, number | null | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  FETCH_OFFERS_NEARBY_ACTION,
  async (id = null, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
      dispatch(loadOffersNearby(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, number | null | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  FETCH_REVIEWS_ACTION,
  async (id = null, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
      dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addReviewAction = createAsyncThunk<void, NewReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ADD_REVIEW_ACTION,
  async ({ comment, rating, roomId }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Review[]>(`${APIRoute.Reviews}/${roomId}`, { comment, rating });
      dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const setFavoritesAction = createAsyncThunk<void, Offer, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  SET_FAVORITES_ACTION,
  async ({ id, isFavorite }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${Number(isFavorite)}`);
      dispatch(setFavorites(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  FETCH_FAVORITES_ACTION,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorite);
      dispatch(loadFavorites(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  CHECK_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data: { email } } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserName(email));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  USER_LOGIN,
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserName(email));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  USER_LOGOUT,
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUserName(''));
    } catch (error) {
      errorHandle(error);
    }
  },
);
