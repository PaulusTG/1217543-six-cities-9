import { City } from './types/city';
import { Offer } from './types/offer';

const LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
  NotFound = '/notfound'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum SortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

enum APIRoute {
  Offers = '/hotels',
  Nearby = '/nearby',
  Favorite = '/favorite',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
}

enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

enum NameSpace {
  data = 'DATA',
  user = 'USER',
}

const DEFAULT_OFFER: Offer = {
  id: 0,
  previewImage: '',
  isPremium: false,
  isFavorite: false,
  price: 0,
  rating: 0,
  title: 'Loading title',
  type: 'Loading type',
  images: [],
  description: 'Loading description',
  bedrooms: 0,
  maxAdults: 0,
  goods: ['Loading goods'],
  host: {
    id: 0,
    avatarUrl: '',
    isPro: false,
    name: '',
  },
  city: {
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
    name: 'Paris',
  },
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0,
  },
};

const CITIES: City[] = [
  {
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
    name: 'Paris',
  },
  {
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
    name: 'Cologne',
  },
  {
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
    name: 'Brussels',
  },
  {
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
    name: 'Amsterdam',
  },
  {
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
    name: 'Hamburg',
  },
  {
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
    name: 'Dusseldorf',
  },
];

export { AppRoute, AuthorizationStatus, SortType, APIRoute, HTTP_CODE, CITIES, DEFAULT_OFFER, NameSpace, LAYER_URL, LAYER_ATTRIBUTION };
