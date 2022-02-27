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
  host: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string,
  },
  city: {
    location: {
      latitude: number,
      longitude: number,
      zoom: number,
    },
    name: string,
  },
};
