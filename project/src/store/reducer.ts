import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType, loadOffers, loadOffersNearby, loadReviews, loadRoom, requireAuthorization, setError, setOffers, setUserName, sortOffers } from './actions';
import { filterByCity, sortByType } from '../utils';
import { AuthorizationStatus, DEFAULT_OFFER, SortType } from '../constants';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT_TYPE = SortType.Popular;

type InitialState = {
  city: string,
  offers: Offer[],
  offersNearby: Offer[],
  currentOffers: Offer[],
  room: Offer,
  reviews: Review[],
  sortType: SortType,
  isDataLoaded: boolean,
  error: string,
  authorizationStatus: AuthorizationStatus,
  userName: string,
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  currentOffers: [],
  room: DEFAULT_OFFER,
  reviews: [],
  offersNearby: [],
  sortType: DEFAULT_SORT_TYPE,
  isDataLoaded: false,
  error: '',
  authorizationStatus: AuthorizationStatus.Unknown,
  userName: '',
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
    })
    .addCase(setUserName, (state, action) => {
      state.userName = action.payload;
    })
    .addCase(loadRoom, (state, action) => {
      state.room = action.payload;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    });
});

export { reducer };
