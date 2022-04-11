import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { AppRoute, AuthorizationStatus, DEFAULT_OFFER } from '../../constants';
import { initialState } from '../../store/data-process/data-process';
import HistoryRouter from '../history-route/history-route';
import OfferPage from './offer-page';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();
const room = DEFAULT_OFFER;
const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  DATA: { ...initialState, room },
});
const history = createMemoryHistory();

describe('Component: OfferPage', () => {
  it('should render "OfferPage" when user navigate to /offer/id', () => {
    history.push(`${AppRoute.Room}/${room.id}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(`${room.title}`)).toBeInTheDocument();
    expect(screen.getByText(`${room.type}`)).toBeInTheDocument();
    expect(screen.getByText(`${room.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${room.maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByText(`${room.description}`)).toBeInTheDocument();
    expect(screen.getByTestId('near-places')).toBeInTheDocument();
  });

  it('should work correctly by bookmark click', () => {
    const bookmarkClickHandle = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(bookmarkClickHandle);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(bookmarkClickHandle).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByTestId('bookmark-button'));
    expect(bookmarkClickHandle).toHaveBeenCalledTimes(2);
  });
});
