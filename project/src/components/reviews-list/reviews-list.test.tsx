import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeReview } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import ReviewsList from './reviews-list';

const mockStore = configureMockStore();
const review = [makeFakeReview()];
const store = mockStore({});
const history = createMemoryHistory();

describe('Component: ReviewsList', () => {
  it('should render "ReviewsList"', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsList reviews={review} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
  });
});
