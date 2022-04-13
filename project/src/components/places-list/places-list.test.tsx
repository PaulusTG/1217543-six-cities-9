import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../constants';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import PlacesList from './places-list';

const mockStore = configureMockStore();
const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
});

describe('Component: PlacesList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offers = [makeFakeOffer()];
    const onPlacesListHover = jest.fn();
    const pageClass = 'test';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlacesList offers={offers} onPlacesListHover={onPlacesListHover} pageClass={pageClass} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('places-list')).toBeInTheDocument();
  });
});
