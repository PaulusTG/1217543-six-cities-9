import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { DEFAULT_OFFER } from '../../constants';
import HistoryRouter from '../history-route/history-route';
import ReviewForm from './review-form';

const mockStore = configureMockStore();
const room = DEFAULT_OFFER;
const store = mockStore({
  DATA: { room },
});
const history = createMemoryHistory();

describe('Component: ReviewForm', () => {
  it('should render "ReviewForm"', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
    expect(screen.getByTestId('reviews__textarea')).toBeInTheDocument();
    expect(screen.getByTestId('reviews__submit')).toBeInTheDocument();
  });
});
