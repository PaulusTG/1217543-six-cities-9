import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeReview } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import ReviewsItem from './reviews-item';

const mockStore = configureMockStore();
const review = makeFakeReview();
const store = mockStore({});
const history = createMemoryHistory();

describe('Component: ReviewsItem', () => {
  it('should render "ReviewsItem"', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsItem review={review} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('reviews__avatar')).toBeInTheDocument();
    expect(screen.getByTestId('reviews__user-name')).toBeInTheDocument();
    expect(screen.getByTestId('reviews__rating')).toBeInTheDocument();
    expect(screen.getByTestId('reviews__text')).toBeInTheDocument();
    expect(screen.getByTestId('reviews__time')).toBeInTheDocument();
  });
});
