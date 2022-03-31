import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus, DEFAULT_OFFER } from '../../constants';
import { Provider } from 'react-redux';
import App from './app';
import { makeFakeOffer } from '../../utils/mocks';
import { DEFAULT_CITY, initialState } from '../../store/data-process/data-process';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';

const mockStore = configureMockStore();
const currentOffers = [makeFakeOffer()];
const favorites = [makeFakeOffer()];
const city = DEFAULT_CITY;
const room = DEFAULT_OFFER;

const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  DATA: { ...initialState, isDataLoaded: true, currentOffers, city, favorites, room },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    const boldElement = `${currentOffers.length} places to stay in ${city}`;

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText(boldElement)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigate to "/offer/id"', () => {
    history.push(`${AppRoute.Room}/${room.id}`);

    render(fakeApp);

    expect(screen.getByText(`${room.title}`)).toBeInTheDocument();
    expect(screen.getByText(`${room.type}`)).toBeInTheDocument();
    expect(screen.getByText(`${room.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${room.maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByText(`${room.description}`)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to "/notfound"', () => {
    history.push(AppRoute.NotFound);

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
