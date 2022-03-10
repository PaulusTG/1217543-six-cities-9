import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('main/changeCity', (value) => ({
  payload: value,
}));

export const fillOffers = createAction('main/fillOffers');

export const sortOffers = createAction('main/sortOffers');

export const changeSortType = createAction('main/changeSortType', (value) => ({
  payload: value,
}));
