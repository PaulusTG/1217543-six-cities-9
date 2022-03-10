import { SortType } from './consts';
import { Offer } from './types/offer';

export const filterByCity = (offers: Offer[], city: string): Offer[] => offers.filter((offer) => offer.city.name === city);

export const sortByType = (offers: Offer[], currentSortType: string): Offer[] => {
  switch (currentSortType) {
    case SortType.Popular:
      return offers.sort((offer) => offer.id);
    case SortType.LowToHigh:
      return offers.sort((offerA, offerB) => offerA.price - offerB.price);
    case SortType.HighToLow:
      return offers.sort((offerA, offerB) => offerB.price - offerA.price);
    case SortType.TopRated:
      return offers.sort((offerA, offerB) => offerB.rating - offerA.rating);
    default:
      return offers;
  }
};
