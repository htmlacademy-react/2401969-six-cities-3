import { initialState } from '../../store/slices/offers-slice';
import { renderWithProviders } from '../../utils/mock-component';
import { createMockPlaceCard } from '../../utils/utils';
import { FavoritesPage } from './favorites-page';
import { screen } from '@testing-library/react';


describe('Component: FavoritesPage', () => {
  it('should render with favorite offers', () => {
    const mockFavorites = [
      createMockPlaceCard({ id: '1', isFavorite: true }),
      createMockPlaceCard({ id: '2', isFavorite: true })
    ];

    renderWithProviders(<FavoritesPage />, {
      preloadedState: {
        offers: {
          ...initialState, // Берем все поля из initialState
          favoriteCards: mockFavorites // Правильное название поля!
        }
      }
    });

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('favorites-content')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-empty')).toBeNull();
  });

  it('should render empty state when no favorites', () => {
    renderWithProviders(<FavoritesPage />, {
      preloadedState: {
        offers: {
          ...initialState,
          favoriteCards: [] // Явно указываем пустой массив
        }
      }
    });

    expect(screen.getByTestId('favorites-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-content')).toBeNull();
  });
});
