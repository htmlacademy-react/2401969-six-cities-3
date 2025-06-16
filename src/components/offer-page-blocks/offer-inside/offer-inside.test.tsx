import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { OfferInside } from './offer-inside';
import { renderWithProviders } from '../../../utils/mock-component';

describe('Component: OfferInside', () => {
  const mockGoods = ['Wi-Fi', 'Kitchen', 'Washing machine', 'Towels', 'Heating'];

  it('should render title correctly', () => {
    renderWithProviders(<OfferInside goods={mockGoods} />);
    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
  });

  it('should render all goods items', () => {
    renderWithProviders(<OfferInside goods={mockGoods} />);

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(mockGoods.length);

    mockGoods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
  });

  it('should render empty list when no goods provided', () => {
    renderWithProviders(<OfferInside goods={[]} />);

    expect(screen.queryAllByRole('listitem').length).toBe(0);
    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
  });

  it('should render with correct classes', () => {
    renderWithProviders(<OfferInside goods={mockGoods} />);

    expect(screen.getByRole('list')).toHaveClass('offer__inside-list');
    expect(screen.getByText('What\'s inside')).toHaveClass('offer__inside-title');
  });

  it('should render each item with correct class', () => {
    renderWithProviders(<OfferInside goods={mockGoods} />);

    const firstItem = screen.getAllByRole('listitem')[0];
    expect(firstItem).toHaveClass('offer__inside-item');
  });
});
