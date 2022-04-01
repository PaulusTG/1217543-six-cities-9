import { address, datatype, image, internet, lorem, name, random } from 'faker';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

export const makeFakeOffer = (): Offer => ({
  id: datatype.number(),
  previewImage: image.imageUrl(),
  isPremium: datatype.boolean(),
  isFavorite: datatype.boolean(),
  price: datatype.number(),
  rating: datatype.float(),
  title: lorem.text(),
  type: datatype.string(),
  images: new Array(3).fill(null).map(() => image.imageUrl()),
  description: datatype.string(),
  bedrooms: datatype.number(),
  maxAdults: datatype.number(),
  goods: new Array(4).fill(null).map(() => random.word()),
  host: {
    id: datatype.number(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  city: {
    location: {
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: datatype.number(),
    },
    name: address.cityName(),
  },
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: datatype.number(),
  },
} as Offer);

export const makeFakeReview = (): Review => ({
  comment: datatype.string(),
  date: datatype.string(),
  id: datatype.number(),
  rating: datatype.float(),
  user: {
    id: datatype.number(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
} as Review);

export const makeFakeCity = (): City => ({
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: datatype.number(),
  },
  name: address.cityName(),
} as City);
