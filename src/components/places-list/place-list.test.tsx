import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlacesList } from './places-list';
import { renderWithProviders } from '../../utils/mock-component';
import { createMockPlaceCard } from '../../utils/utils';


describe('Component: PlacesList', () => {
  const mockCards = [
    createMockPlaceCard({ id: '1', title: 'Place 1' }),
    createMockPlaceCard({ id: '2', title: 'Place 2' }),
    createMockPlaceCard({ id: '3', title: 'Place 3' })
  ];

  it('should render all place cards', () => {
    renderWithProviders(<PlacesList placeCards={mockCards} />);

    const cards = screen.getAllByTestId('place-card');
    expect(cards).toHaveLength(mockCards.length);
  });

  it('should pass correct props to PlaceCard', () => {
    renderWithProviders(<PlacesList placeCards={mockCards} />);

    mockCards.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
    });
  });

  it('should call mouse handlers when provided', async () => {
    const user = userEvent.setup();
    const mouseEnterMock = vi.fn();
    const mouseLeaveMock = vi.fn();

    renderWithProviders(
      <PlacesList
        placeCards={mockCards}
        onMouseEnter={mouseEnterMock}
        onMouseLeave={mouseLeaveMock}
      />
    );

    const firstCard = screen.getAllByTestId('place-card')[0];

    await user.hover(firstCard);
    expect(mouseEnterMock).toHaveBeenCalledWith('1');

    await user.unhover(firstCard);
    expect(mouseLeaveMock).toHaveBeenCalled();
  });

  it('should apply correct CSS classes', () => {
    renderWithProviders(<PlacesList placeCards={mockCards} />);

    const list = screen.getByTestId('place-list');
    expect(list).toHaveClass('cities__places-list');
    expect(list).toHaveClass('places__list');
    expect(list).toHaveClass('tabs__content');
  });
});
