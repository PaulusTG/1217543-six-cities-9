import { NameSpace, SortType } from '../../constants';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getRoom = (state: State): Offer => state[NameSpace.Data].room;
export const getCurrentOffers = (state: State): Offer[] => state[NameSpace.Data].currentOffers;
export const getFavorites = (state: State): Offer[] => state[NameSpace.Data].favorites;
export const getOffersNearby = (state: State): Offer[] => state[NameSpace.Data].offersNearby;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getIsNeedMapLayerUpdate = (state: State): boolean => state[NameSpace.Data].isNeedMapLayerUpdate;
export const getCity = (state: State): string => state[NameSpace.Data].city;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getSortType = (state: State): SortType => state[NameSpace.Data].sortType;
