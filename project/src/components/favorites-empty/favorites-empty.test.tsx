import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import FavoritesEmpty from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <FavoritesEmpty />
      </HistoryRouter>,
    );

    const boldElement = screen.getByText('Nothing yet saved.');
    const paragrathElement = screen.getByText('Save properties to narrow down search or plan your future trips.');

    expect(boldElement).toBeInTheDocument();
    expect(paragrathElement).toBeInTheDocument();
  });
});
