import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
    id: 1,
    rating: 4.4,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 1,
      isPro: false,
      name: 'Max',
    },
  },
  {
    comment: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    date: '2019-05-15',
    id: 2,
    rating: 3.2,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 2,
      isPro: true,
      name: 'Angelina',
    },
  },
];
