import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { PlaceCard } from './place-card';
import { AppRoute } from '../../const';
import { createMockPlaceCard } from '../../utils/utils';
import { renderWithProviders } from '../../utils/mock-component';

describe('Component: PlaceCard', () => {
  const mockCard = createMockPlaceCard({
    isPremium: true,
    isFavorite: false,
    type: 'Apartment',
    price: 120,
    rating: 4.5,
    previewImage: 'img/test-preview.jpg'
  });

  it('should render correctly with basic props', () => {
    renderWithProviders(<PlaceCard {...mockCard} />);

    expect(screen.getByText(mockCard.title)).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByText(/€120/i)).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
  });

  it('should conditionally render premium mark', () => {
  // Проверяем что премиум отображается при isPremium=true
    const { rerender } = renderWithProviders(<PlaceCard {...mockCard} isPremium />);
    expect(screen.getByText('Premium')).toBeInTheDocument();

    // Проверяем что премиум НЕ отображается при isPremium=false
    rerender(<PlaceCard {...mockCard} isPremium={false} />);
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render correct image attributes', () => {
    renderWithProviders(<PlaceCard {...mockCard} />);

    const image = screen.getByAltText('Place image');
    expect(image).toHaveAttribute('src', mockCard.previewImage);
    expect(image).toHaveAttribute('width', '260');
    expect(image).toHaveAttribute('height', '200');
  });

  it('should render correct image size for favorites', () => {
    renderWithProviders(<PlaceCard {...mockCard} place="favorites" />);

    const image = screen.getByAltText('Place image');
    expect(image).toHaveAttribute('width', '150');
    expect(image).toHaveAttribute('height', '110');
  });

  it('should calculate rating width correctly', () => {
  // Используем значение, которое не требует округления
    renderWithProviders(<PlaceCard {...mockCard} rating={3} />);

    const ratingBar = screen.getByTestId('rating-stars');
    expect(ratingBar).toHaveStyle('width: 60%'); // 3/5*100 = 60%
  });

  it('should have correct offer links', () => {
    renderWithProviders(<PlaceCard {...mockCard} />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', `${AppRoute.Offers}/${mockCard.id}`);
    });
  });
});
