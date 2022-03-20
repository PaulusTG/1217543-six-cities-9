import { AuthorizationStatus, SortType } from '../constants';
import { store } from '../store';
import { Offer } from './offer';
import { Review } from './review';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userName: string,
};

export type DataProcess = {
  city: string,
  offers: Offer[],
  currentOffers: Offer[],
  offersNearby: Offer[],
  room: Offer,
  reviews: Review[],
  sortType: SortType,
  isDataLoaded: boolean,
  isNeedMapLayerUpdate: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
