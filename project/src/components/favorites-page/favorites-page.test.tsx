import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../constants';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import FavoritesPage from './favorites-page';

const mockStore = configureMockStore();
const favorites = [makeFakeOffer()];
const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  DATA: { favorites },
});
const history = createMemoryHistory();

describe('Component: "FavoritesPage"', () => {
  it('should renden "FavoritesPage" when user navigate to /favorites', () => {
    history.push('/favorites');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });
});
