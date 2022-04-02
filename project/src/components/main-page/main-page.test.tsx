import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { DEFAULT_CITY, initialState } from '../../store/data-process/data-process';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import MainPage from './main-page';

const mockStore = configureMockStore();
const city = DEFAULT_CITY;
const currentOffers = [makeFakeOffer()];
const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  DATA: { ...initialState, city, currentOffers },
});
const history = createMemoryHistory();

describe('Component: MainPage', () => {
  it('should render "MainPage" when user navigate to /', () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>,
    );

    const boldElement = `${currentOffers.length} places to stay in ${city}`;

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText(boldElement)).toBeInTheDocument();
    expect(screen.getByTestId('cities__map')).toBeInTheDocument();
  });
});
