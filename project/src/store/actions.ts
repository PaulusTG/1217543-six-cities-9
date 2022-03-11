import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const changeCity = createAction('main/changeCity', (value) => ({
  payload: value,
}));

export const loadOffers = createAction<Offer[]>('main/loadOffers');

export const setOffers = createAction('main/setOffers');

export const sortOffers = createAction('main/sortOffers');

export const changeSortType = createAction('main/changeSortType', (value) => ({
  payload: value,
}));

export const setError = createAction<string>('/main/setError');
