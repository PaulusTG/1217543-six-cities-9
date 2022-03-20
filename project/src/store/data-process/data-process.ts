import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_OFFER, NameSpace, SortType } from '../../constants';
import { DataProcess } from '../../types/state';
import { filterByCity, sortByType } from '../../utils';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT_TYPE = SortType.Popular;

const initialState: DataProcess = {
  city: DEFAULT_CITY,
  offers: [],
  currentOffers: [],
  offersNearby: [],
  favorites: [],
  room: DEFAULT_OFFER,
  reviews: [],
  sortType: DEFAULT_SORT_TYPE,
  isDataLoaded: false,
  isNeedMapLayerUpdate: false,
};

export const dataProcess = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.currentOffers = filterByCity(state.offers, state.city);
      state.isDataLoaded = true;
    },
    setOffers: (state) => {
      state.currentOffers = filterByCity(state.offers, state.city);
    },
    sortOffers: (state) => {
      state.currentOffers = sortByType(filterByCity(state.offers, state.city), state.sortType);
    },
    loadRoom: (state, action) => {
      state.room = action.payload;
    },
    loadOffersNearby: (state, action) => {
      state.offersNearby = action.payload;
      state.isNeedMapLayerUpdate = true;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
    loadFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setFavorites: (state, action) => {
      if (!action.payload.isFavorite) {
        state.favorites = state.favorites.filter((item) => item.id !== action.payload.id);
      }
      const index = state.offers.findIndex((item) => item.id === action.payload.id);
      state.offers = [
        ...state.offers.slice(0, index),
        action.payload,
        ...state.offers.slice(index + 1),
      ];
    },
    setIsNeedMapLayerUpdate: (state, action) => {
      state.isNeedMapLayerUpdate = action.payload;
    },
    changeCity: (state, action) => {
      state.city = action.payload;
      state.sortType = DEFAULT_SORT_TYPE;
      state.isNeedMapLayerUpdate = true;
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { loadOffers, loadRoom, loadOffersNearby, loadReviews,
  loadFavorites, setOffers, setIsNeedMapLayerUpdate, changeCity,
  changeSortType, sortOffers, setFavorites } = dataProcess.actions;
