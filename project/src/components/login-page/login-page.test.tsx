import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { DEFAULT_CITY } from '../../store/data-process/data-process';
import HistoryRouter from '../history-route/history-route';
import LoginPage from './login-page';

const mockStore = configureMockStore();
const city = DEFAULT_CITY;
const store = mockStore({
  DATA: { city },
});
const history = createMemoryHistory();

describe('Component: LoginPage', () => {
  it('should render "LoginPage" when user navigate to /login', () => {
    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
});
