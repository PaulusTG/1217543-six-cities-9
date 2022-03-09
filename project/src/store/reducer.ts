import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffers } from './actions';
import { offers } from '../mocks/offers';

const DEFAULT_CITY = 'Paris';

const initialState = {
  city: DEFAULT_CITY,
  offers: offers.filter((offer) => offer.city.name === DEFAULT_CITY),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state) => {
      state.offers = offers.filter((offer) => offer.city.name === state.city);
    });
});

export { reducer };
