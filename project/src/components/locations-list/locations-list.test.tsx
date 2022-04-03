import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { DEFAULT_CITY } from '../../store/data-process/data-process';
import HistoryRouter from '../history-route/history-route';
import LocationsList from './locations-list';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();
const currentCity = DEFAULT_CITY;
const store = mockStore({});
const history = createMemoryHistory();

describe('Component: LocationsList', () => {
  it('should render "LocationsList" when user navigate to /login', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LocationsList currentCity={currentCity} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('locations__list')).toBeInTheDocument();
  });

  it('should work correctly by city click', () => {
    const onCityClick = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(onCityClick);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LocationsList currentCity={currentCity} />
        </HistoryRouter>
      </Provider>,
    );

    expect(onCityClick).toHaveBeenCalledTimes(0);
    screen.getAllByTestId('tabs__item').forEach((item, index) => {
      expect(onCityClick).toHaveBeenCalledTimes(index * 2);
      userEvent.click(item);
    });
  });
});
