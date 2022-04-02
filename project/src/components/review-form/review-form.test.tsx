import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { DEFAULT_OFFER } from '../../constants';
import HistoryRouter from '../history-route/history-route';
import ReviewForm from './review-form';
import * as Redux from 'react-redux';

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

  it('should work correctly by reviews submit click', async () => {
    const handleClick = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(handleClick);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>,
    );

    expect(handleClick).toHaveBeenCalledTimes(0);
    const labelRating = screen.getByTestId('label-rating');
    userEvent.click(labelRating);
    userEvent.type(screen.getByTestId('reviews__textarea'), 'Этот комментарий точно состоит из 50 символов, можете даже не сомневаться в этом.');
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
