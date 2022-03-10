import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType, fillOffers, sortOffers } from './actions';
import { offers } from '../mocks/offers';
import { filterByCity, sortByType } from '../utils';
import { SortType } from '../consts';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT_TYPE = SortType.Popular;

const initialState = {
  city: DEFAULT_CITY,
  offers: filterByCity(offers, DEFAULT_CITY),
  sortType: DEFAULT_SORT_TYPE,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state) => {
      state.offers = filterByCity(offers, state.city);
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(sortOffers, (state) => {
      state.offers = sortByType(filterByCity(offers, state.city), state.sortType);
    });
});

export { reducer };
