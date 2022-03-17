import { Host } from './host';

export type Review = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: Host
};

export type NewReview = {
  comment: string,
  rating: number,
  roomId: number | null,
};
