import { City } from './city';
import { Host } from './host';
import { Location } from './location';

export type Offer = {
  id: number,
  previewImage: string,
  isPremium: boolean,
  isFavorite: boolean,
  price: number,
  rating: number,
  title: string,
  type: string,
  images: string[],
  description: string,
  bedrooms: number,
  maxAdults: number,
  goods: string[],
  host: Host,
  city: City,
  location: Location,
};
