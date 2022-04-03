import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { DEFAULT_CITY } from '../../store/data-process/data-process';
import HistoryRouter from '../history-route/history-route';
import MainEmpty from './main-empty';

const mockStore = configureMockStore();
const city = DEFAULT_CITY;
const store = mockStore({
  DATA: { city },
});
const history = createMemoryHistory();

describe('Component: MainEmpty', () => {
  it('should render "MainEmpty"', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainEmpty />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${city}`)).toBeInTheDocument();
  });
});
