import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { NearPlaces } from './near-places';
import { MAX_NEAR_PLACES } from '../../../const';
import { renderWithProviders } from '../../../utils/mock-component';
import { createMockPlaceCard } from '../../../utils/utils';


describe('Component: NearPlaces', () => {
  const mockCards = Array.from({ length: 10 }, (_, i) =>
    createMockPlaceCard({
      id: `${i + 1}`,
      title: `Place ${i + 1}`,
      isFavorite: i % 2 === 0
    })
  );

  it('should render title correctly', () => {
    renderWithProviders(<NearPlaces cityPlaceCards={mockCards} />);
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });

  it(`should render no more than ${MAX_NEAR_PLACES} cards`, () => {
    renderWithProviders(<NearPlaces cityPlaceCards={mockCards} />);
    const cards = screen.getAllByTestId('place-card');
    expect(cards.length).toBe(MAX_NEAR_PLACES);
  });

  it('should render all cards when less than MAX_NEAR_PLACES', () => {
    const fewCards = mockCards.slice(0, MAX_NEAR_PLACES - 1);
    renderWithProviders(<NearPlaces cityPlaceCards={fewCards} />);
    const cards = screen.getAllByTestId('place-card');
    expect(cards.length).toBe(fewCards.length);
  });

  it('should pass correct props to PlaceCard', () => {
    renderWithProviders(<NearPlaces cityPlaceCards={mockCards} />);

    // Проверяем первый элемент
    expect(screen.getByText('Place 1')).toBeInTheDocument();

    // Проверяем что передается правильное место размещения
    const firstCard = screen.getAllByTestId('place-card')[0];
    expect(firstCard).toHaveClass('near-places__card');
  });

  it('should pass isFavorite prop correctly', () => {
    renderWithProviders(<NearPlaces cityPlaceCards={mockCards} />);

    // Первая карточка должна быть в избранном (isFavorite=true)
    const favoriteButton = screen.getAllByRole('button', { name: /favorite/i })[0];
    expect(favoriteButton).toHaveAttribute('data-is-favorite', 'true');

    // Вторая карточка не в избранном (isFavorite=false)
    const notFavoriteButton = screen.getAllByRole('button', { name: /favorite/i })[1];
    expect(notFavoriteButton).toHaveAttribute('data-is-favorite', 'false');
  });
});
