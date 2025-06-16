import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { OfferCard } from './offer-card';
import { renderWithProviders } from '../../../utils/mock-component';
import { createMockPlaceCard } from '../../../utils/utils';


describe('Component: OfferCard', () => {
  const mockOffer = createMockPlaceCard({
    id: '1',
    title: 'Test Offer',
    type: 'Apartment',
    price: 120,
    rating: 4.5,
    isPremium: true,
    isFavorite: false,
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Kitchen'],
    description: 'Test description',
    host: {
      name: 'Test Host',
      isPro: true,
      avatarUrl: 'img/avatar.jpg'
    }
  });

  it('should render all offer details correctly', () => {
    renderWithProviders(<OfferCard offerCard={mockOffer} />);
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
  });

  it('should render premium mark when isPremium=true', () => {
    renderWithProviders(<OfferCard offerCard={mockOffer} />);
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render premium mark when isPremium=false', () => {
    const offerWithoutPremium = { ...mockOffer, isPremium: false };
    renderWithProviders(<OfferCard offerCard={offerWithoutPremium} />);
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render FavoriteButton correctly', () => {
    renderWithProviders(<OfferCard offerCard={mockOffer} />);
    expect(screen.getByRole('button', { name: /favorites/i })).toBeInTheDocument();
  });

  it('should render OfferInside with correct goods', () => {
    renderWithProviders(<OfferCard offerCard={mockOffer} />);
    mockOffer.goods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
  });

  it('should render OfferHost with correct data', () => {
    renderWithProviders(<OfferCard offerCard={mockOffer} />);
    expect(screen.getByText(mockOffer.host.name)).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('should display correct rating value', () => {
    renderWithProviders(<OfferCard offerCard={mockOffer} />);
    expect(screen.getByText(mockOffer.rating)).toBeInTheDocument();
  });
});
