import { TileLayer, Map } from 'leaflet';
import { LAYER_ATTRIBUTION, LAYER_URL, SortType } from '../constants';
import { Offer } from '../types/offer';

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

export const addLayerToMap = (map: Map) => {
  const layer = new TileLayer(
    LAYER_URL,
    {
      attribution:
        LAYER_ATTRIBUTION,
    },
  );
  map.addLayer(layer);
};

export const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
