
import { renderWithProviders } from '../../../utils/mock-component';
import { createMockPlaceCard } from '../../../utils/utils';
import { FavoritesContent } from './favorites-content';
import { screen } from '@testing-library/react';


describe('Component: FavoritesContent', () => {
  const mockCity = {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  };

  it('should render favorites grouped by city', () => {
    const mockFavorites = [
      createMockPlaceCard({
        id: '1',
        city: mockCity,
        isFavorite: true
      }),
      createMockPlaceCard({
        id: '2',
        city: mockCity,
        isFavorite: true
      })
    ];

    renderWithProviders(<FavoritesContent favoriteCards={mockFavorites} />);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card')).toHaveLength(2);
  });
});
