import { address } from 'faker';
import { DEFAULT_OFFER, SortType } from '../../constants';
import { makeFakeOffer, makeFakeReview } from '../../utils/mocks';
import { filterByCity, sortByType } from '../../utils/utils';
import { changeCity, changeSortType, dataProcess, loadFavorites, loadOffers, loadOffersNearby, loadReviews, loadRoom, setFavorites, setIsNeedMapLayerUpdate, setOffers, sortOffers } from './data-process';

const city = address.cityName();
const offers = [makeFakeOffer()];
const room = makeFakeOffer();
const reviews = [makeFakeReview()];
const isNeedMapLayerUpdate = true;
const sortType = SortType.HighToLow;

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        city: 'Paris',
        offers: [],
        currentOffers: [],
        offersNearby: [],
        favorites: [],
        room: DEFAULT_OFFER,
        reviews: [],
        sortType: SortType.Popular,
        isDataLoaded: false,
        isNeedMapLayerUpdate: false,
      });
  });

  it('should update city by changeCity', () => {
    const state = {
      city: 'Paris', offers: [], currentOffers: [],
      offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
      sortType: SortType.Popular, isDataLoaded: false,
      isNeedMapLayerUpdate: false,
    };

    expect(dataProcess.reducer(state, changeCity(city)))
      .toEqual({
        city, offers: [], currentOffers: [],
        offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
        sortType: SortType.Popular, isDataLoaded: false,
        isNeedMapLayerUpdate: true,
      });
  });

  it('should update offers by loadOffers', () => {
    const state = {
      city: 'Paris', offers: [], currentOffers: [],
      offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
      sortType: SortType.Popular, isDataLoaded: false,
      isNeedMapLayerUpdate: false,
    };

    expect(dataProcess.reducer(state, loadOffers(offers)))
      .toEqual({
        city: 'Paris', offers, currentOffers: filterByCity(state.offers, state.city),
        offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
        sortType: SortType.Popular, isDataLoaded: true,
        isNeedMapLayerUpdate: false,
      });
  });

  it('should update currentOffers by setOffers', () => {
    const state = {
      city: 'Paris', offers: [], currentOffers: [],
      offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
      sortType: SortType.Popular, isDataLoaded: false,
      isNeedMapLayerUpdate: false,
    };

    expect(dataProcess.reducer(state, setOffers()))
      .toEqual({
        city: 'Paris', offers: [], currentOffers: filterByCity(state.offers, state.city),
        offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
        sortType: SortType.Popular, isDataLoaded: false,
        isNeedMapLayerUpdate: false,
      });
  });

  it('should update currentOffers by sortOffers', () => {
    const state = {
      city: 'Paris', offers: [], currentOffers: [],
      offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
      sortType: SortType.Popular, isDataLoaded: false,
      isNeedMapLayerUpdate: false,
    };

    expect(dataProcess.reducer(state, sortOffers()))
      .toEqual({
        city: 'Paris', offers: [], currentOffers: sortByType(filterByCity(state.offers, state.city), state.sortType),
        offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
        sortType: SortType.Popular, isDataLoaded: false,
        isNeedMapLayerUpdate: false,
      });
  });

  it('should update room by loadRoom', () => {
    const state = {
      city: 'Paris', offers: [], currentOffers: [],
      offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
      sortType: SortType.Popular, isDataLoaded: false,
      isNeedMapLayerUpdate: false,
    };

    expect(dataProcess.reducer(state, loadRoom(room)))
      .toEqual({
        city: 'Paris', offers: [], currentOffers: [],
        offersNearby: [], favorites: [], room, reviews: [],
        sortType: SortType.Popular, isDataLoaded: false,
        isNeedMapLayerUpdate: false,
      });
  });

  it('should update offersNearby by loadOffersNearby', () => {
    const state = {
      city: 'Paris', offers: [], currentOffers: [],
      offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
      sortType: SortType.Popular, isDataLoaded: false,
      isNeedMapLayerUpdate: false,
    };

    expect(dataProcess.reducer(state, loadOffersNearby(offers)))
      .toEqual({
        city: 'Paris', offers: [], currentOffers: [],
        offersNearby: offers, favorites: [], room: DEFAULT_OFFER, reviews: [],
        sortType: SortType.Popular, isDataLoaded: false,
        isNeedMapLayerUpdate: true,
      });
  });

  it('should update reviews by loadReviews', () => {
    const state = {
      city: 'Paris', offers: [], currentOffers: [],
      offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
      sortType: SortType.Popular, isDataLoaded: false,
      isNeedMapLayerUpdate: false,
    };

    expect(dataProcess.reducer(state, loadReviews(reviews)))
      .toEqual({
        city: 'Paris', offers: [], currentOffers: [],
        offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews,
        sortType: SortType.Popular, isDataLoaded: false,
        isNeedMapLayerUpdate: false,
      });
  });

  it('should update favorites by loadFavorites', () => {
    const state = {
      city: 'Paris', offers: [], currentOffers: [],
      offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
      sortType: SortType.Popular, isDataLoaded: false,
      isNeedMapLayerUpdate: false,
    };

    expect(dataProcess.reducer(state, loadFavorites(offers)))
      .toEqual({
        city: 'Paris', offers: [], currentOffers: [],
        offersNearby: [], favorites: offers, room: DEFAULT_OFFER, reviews: [],
        sortType: SortType.Popular, isDataLoaded: false,
        isNeedMapLayerUpdate: false,
      });
  });

  it('should update favorites by setFavorites', () => {
    const state = {
      city: 'Paris', offers: [], currentOffers: [],
      offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
      sortType: SortType.Popular, isDataLoaded: false,
      isNeedMapLayerUpdate: false,
    };

    expect(dataProcess.reducer(state, setFavorites(offers)))
      .toEqual({
        city: 'Paris', offers: [offers], currentOffers: [],
        offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
        sortType: SortType.Popular, isDataLoaded: false,
        isNeedMapLayerUpdate: false,
      });
  });

  it('should update isNeedMapLayerUpdate by setIsNeedMapLayerUpdate', () => {
    const state = {
      city: 'Paris', offers: [], currentOffers: [],
      offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
      sortType: SortType.Popular, isDataLoaded: false,
      isNeedMapLayerUpdate: false,
    };

    expect(dataProcess.reducer(state, setIsNeedMapLayerUpdate(isNeedMapLayerUpdate)))
      .toEqual({
        city: 'Paris', offers: [], currentOffers: [],
        offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
        sortType: SortType.Popular, isDataLoaded: false,
        isNeedMapLayerUpdate,
      });
  });

  it('should update sortType by changeSortType', () => {
    const state = {
      city: 'Paris', offers: [], currentOffers: [],
      offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
      sortType: SortType.Popular, isDataLoaded: false,
      isNeedMapLayerUpdate: false,
    };

    expect(dataProcess.reducer(state, changeSortType(sortType)))
      .toEqual({
        city: 'Paris', offers: [], currentOffers: [],
        offersNearby: [], favorites: [], room: DEFAULT_OFFER, reviews: [],
        sortType, isDataLoaded: false,
        isNeedMapLayerUpdate: false,
      });
  });
});
