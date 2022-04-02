import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../constants';
import HistoryRouter from '../history-route/history-route';
import Header from './header';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();
const userName = 'test@test.ru';
const history = createMemoryHistory();

describe('Component: "Header"', () => {
  it('should renden "Header" when user is not authorized', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth, userName },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should renden "Header" when user is authorized', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth, userName },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(userName)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should work correctly by click "Sign out"', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth, userName },
    });
    const logoutAction = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(logoutAction);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(logoutAction).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByTestId('header__signout'));
    expect(logoutAction).toHaveBeenCalledTimes(1);
  });

  it('should work correctly by click user name', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth, userName },
    });
    const fetchFavoritesAction = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(fetchFavoritesAction);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(fetchFavoritesAction).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByTestId('header__user-name'));
    expect(fetchFavoritesAction).toHaveBeenCalledTimes(1);
  });
});
