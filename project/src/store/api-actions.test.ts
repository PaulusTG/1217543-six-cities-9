import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { APIRoute } from '../constants';
import { checkAuthAction, fetchFavoritesAction, fetchOfferAction, fetchOffersNearbyAction, fetchReviewsAction, loginAction, logoutAction } from './api-actions';
import { requireAuthorization } from './user-process/user-process';
import { AuthData } from '../types/auth-data';
import { makeFakeOffer } from '../utils/mocks';
import { loadFavorites, loadOffers, loadOffersNearby, loadReviews } from './data-process/data-process';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { token: 'secret' });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch Load_Offers when GET /offers', async () => {
    const mockOffers = [makeFakeOffer()];
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOfferAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(loadOffers.toString());
  });

  it('should dispatch Load_OffersNearby when GET /offers/id/nearby', async () => {
    const mockOffers = [makeFakeOffer()];
    const id = 1;
    mockAPI
      .onGet(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersNearbyAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(loadOffersNearby.toString());
  });

  it('should dispatch Load_Reviews when GET /comments/id', async () => {
    const mockOffers = [makeFakeOffer()];
    const id = 1;
    mockAPI
      .onGet(`${APIRoute.Reviews}/${id}`)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(loadReviews.toString());
  });

  it('should dispatch Add_Reviews when POST /comments/id', async () => {
    const mockOffers = [makeFakeOffer()];
    const id = 1;
    mockAPI
      .onPost(`${APIRoute.Reviews}/${id}`)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(loadReviews.toString());
  });

  it('should dispatch Load_Favorites when GET /favorites', async () => {
    const mockOffers = [makeFakeOffer()];
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoritesAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(loadFavorites.toString());
  });

  it('should dispatch Set_Favorites when POST /favorites/id/status', async () => {
    const mockOffers = [makeFakeOffer()];
    const id = 1;
    const isFavorite = mockOffers[0].isFavorite;
    mockAPI
      .onPost(`${APIRoute.Favorite}/${id}/${Number(isFavorite)}`)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoritesAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(loadFavorites.toString());
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });
});
