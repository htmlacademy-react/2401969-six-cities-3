import { render, screen } from '@testing-library/react';
import { FavoritesEmpty } from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render empty favorites state correctly', () => {
    render(<FavoritesEmpty />);

    // Проверяем основные элементы
    expect(screen.getByTestId('favorites-empty')).toBeInTheDocument();
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search/)).toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    render(<FavoritesEmpty />);

    // Проверяем скрытый заголовок
    const hiddenTitle = screen.getByText('Favorites (empty)');
    expect(hiddenTitle).toHaveClass('visually-hidden');
  });
});
