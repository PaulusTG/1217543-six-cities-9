import { store } from '../store';
import { fetchOfferAction, fetchReviewsAction, fetchOffersNearbyAction } from '../store/api-actions';

export const dispatchOfferData = (id: number | null) => {
  store.dispatch(fetchOfferAction(id));
  store.dispatch(fetchReviewsAction(id));
  store.dispatch(fetchOffersNearbyAction(id));
};
