import { errorHandle } from '../services/error-handle';
import { store } from '../store';
import { fetchOfferAction, fetchReviewsAction, fetchOffersNearbyAction } from '../store/api-actions';

export const dispatchOfferData = async (id: number | null) => {
  try {
    await store.dispatch(fetchOfferAction(id));
    await store.dispatch(fetchReviewsAction(id));
    await store.dispatch(fetchOffersNearbyAction(id));
  } catch (error) {
    errorHandle(error);
  }
};
