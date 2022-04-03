import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCity } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import Map from './map';

const mockStore = configureMockStore();
const store = mockStore({
  DATA: { isNeedMapLayerUpdate: true },
});
const history = createMemoryHistory();
const fakeCity = makeFakeCity();

describe('Component: "Map"', () => {
  it('should render Map', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Map city={fakeCity} points={[fakeCity.location]} selectedPoint={fakeCity.location} mapClassName={'map'} style={{ width: '500', margin: '0' }} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
