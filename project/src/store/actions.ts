import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../constants';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

export const changeCity = createAction('main/changeCity', (value) => ({
  payload: value,
}));

export const loadOffers = createAction<Offer[]>('main/loadOffers');

export const loadRoom = createAction<Offer>('room/loadRoom');

export const loadOffersNearby = createAction<Offer[]>('room/loadOffersNearby');

export const loadReviews = createAction<Review[]>('room/loadReviews');

export const setOffers = createAction('main/setOffers');

export const sortOffers = createAction('main/sortOffers');

export const changeSortType = createAction('main/changeSortType', (value) => ({
  payload: value,
}));

export const setError = createAction<string>('/main/setError');

export const setUserName = createAction<string>('main/setUserName');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
