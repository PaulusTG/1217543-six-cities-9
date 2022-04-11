import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { SortType } from '../../constants';
import HistoryRouter from '../history-route/history-route';
import * as Redux from 'react-redux';
import PlacesSorting from './places-sorting';

const mockStore = configureMockStore();
const store = mockStore({
  DATA: { sortType: SortType.Popular },
});
const history = createMemoryHistory();

describe('Component: PlacesSorting', () => {
  it('should render "PlacesSorting"', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlacesSorting />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('places__options')).toBeInTheDocument();
  });

  it('should work correctly by sort option click', () => {
    const sortTypeClickHandle = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(sortTypeClickHandle);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlacesSorting />
        </HistoryRouter>
      </Provider>,
    );

    expect(sortTypeClickHandle).toHaveBeenCalledTimes(0);
    screen.getAllByTestId('places__option').forEach((item, index) => {
      expect(sortTypeClickHandle).toHaveBeenCalledTimes(index * 2);
      userEvent.click(item);
    });
  });
});
