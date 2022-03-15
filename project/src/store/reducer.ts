import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType, loadOffers, requireAuthorization, setError, setOffers, sortOffers } from './actions';
import { filterByCity, sortByType } from '../utils';
import { AuthorizationStatus, SortType } from '../constants';
import { Offer } from '../types/offer';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT_TYPE = SortType.Popular;

type InitialState = {
  city: string,
  offers: Offer[],
  currentOffers: Offer[],
  sortType: SortType,
  isDataLoaded: boolean,
  error: string,
  authorizationStatus: AuthorizationStatus,
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  currentOffers: [],
  sortType: DEFAULT_SORT_TYPE,
  isDataLoaded: false,
  error: '',
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.sortType = DEFAULT_SORT_TYPE;
    })
    .addCase(setOffers, (state) => {
      state.currentOffers = filterByCity(state.offers, state.city);
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(sortOffers, (state) => {
      state.currentOffers = sortByType(filterByCity(state.offers, state.city), state.sortType);
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.currentOffers = filterByCity(state.offers, state.city);
      state.isDataLoaded = true;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export { reducer };
