import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { FavoriteButton } from './favorite-button';
import { useAppSelector, useOffersActions } from '../../store/hooks';
import { renderWithProviders } from '../../utils/mock-component';

vi.mock('../../store/hooks', () => ({
  useAppSelector: vi.fn(),
  useOffersActions: vi.fn(),
}));

describe('Component: FavoriteButton', () => {
  const mockToggleFavorite = vi.fn();
  const mockUser = { id: '1', name: 'Test User' };

  beforeEach(() => {
    (useOffersActions as jest.Mock).mockReturnValue({ toggleFavorite: mockToggleFavorite });
  });

  it('should render correctly when not favorite', () => {
    (useAppSelector as jest.Mock).mockReturnValue(null);
    renderWithProviders(<FavoriteButton offerId="1" isFavorite={false} />);

    expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-button')).toHaveAttribute('data-is-favorite', 'false');
  });

  it('should render correctly when favorite', () => {
    (useAppSelector as jest.Mock).mockReturnValue(mockUser);
    renderWithProviders(<FavoriteButton offerId="1" isFavorite />);

    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-button')).toHaveAttribute('data-is-favorite', 'true');
  });

  it('should call toggleFavorite with correct arguments when clicked', () => {
    (useAppSelector as jest.Mock).mockReturnValue(mockUser);
    renderWithProviders(<FavoriteButton offerId="1" isFavorite={false} />);

    screen.getByRole('button').click();
    expect(mockToggleFavorite).toHaveBeenCalledWith({ offerId: '1', status: 1 });
  });

});
