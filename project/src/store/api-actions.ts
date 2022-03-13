import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, store } from '.';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../constants';
import { errorHandle } from '../services/error-handle';
import { Offer } from '../types/offer';
import { loadOffers, setError } from './actions';

const CLEAR_ERROR_ACTION = 'game/clearError';
const FETCH_OFFER_ACTION = 'data/fetchOffers';

export const clearErrorAction = createAsyncThunk(
  CLEAR_ERROR_ACTION,
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOfferAction = createAsyncThunk(
  FETCH_OFFER_ACTION,
  async () => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
