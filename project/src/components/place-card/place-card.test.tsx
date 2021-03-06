import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus, DEFAULT_OFFER } from '../../constants';
import HistoryRouter from '../history-route/history-route';
import PlaceCard from './place-card';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();
const offer = DEFAULT_OFFER;
const onPlacesListHover = jest.fn();
const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
});
const history = createMemoryHistory();

describe('Component: PlaceCard', () => {
  it('should render "PlaceCard"', () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard offer={offer} onPlacesListHover={onPlacesListHover} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('place-card__price')).toBeInTheDocument();
    expect(screen.getByTestId('place-card__bookmark-button')).toBeInTheDocument();
    expect(screen.getByTestId('place-card__type')).toBeInTheDocument();
    expect(screen.getByTestId('place-card__name')).toBeInTheDocument();
  });

  it('should work correctly by bookmark click', () => {
    const bookmarkClickHandle = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(bookmarkClickHandle);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard offer={offer} onPlacesListHover={onPlacesListHover} />
        </HistoryRouter>
      </Provider>,
    );

    expect(bookmarkClickHandle).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByTestId('place-card__bookmark-button'));
    expect(bookmarkClickHandle).toHaveBeenCalledTimes(1);
  });
});
