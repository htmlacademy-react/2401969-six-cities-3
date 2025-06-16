import { renderWithProviders } from '../../utils/mock-component';
import { MainPage } from './main-page';
import { screen } from '@testing-library/react';
import { createMockPlaceCard } from '../../utils/utils';
import { RequestStatus } from '../../const';

describe('Component: MainPage', () => {
  it('should render loading state', () => {
    renderWithProviders(<MainPage />, {
      preloadedState: {
        offers: {
          status: RequestStatus.Loading,
          cityName: 'Paris',
          placeCards: [],
          nearbyCards: [],
          offerCard: null,
          favoriteCards: []
        }
      }
    });

    expect(screen.getByTestId('loading-page')).toBeInTheDocument();
  });

  it('should render MainContent when offers exist', () => {
    const mockOffers = [createMockPlaceCard(), createMockPlaceCard()];

    renderWithProviders(<MainPage />, {
      preloadedState: {
        offers: {
          status: RequestStatus.Success,
          cityName: 'Paris',
          placeCards: mockOffers,
          // Остальные обязательные поля
          nearbyCards: [],
          offerCard: null,
          favoriteCards: []
        }
      }
    });

    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.queryByTestId('main-empty')).toBeNull();
  });

  it('should render MainEmpty when no offers', () => {
    renderWithProviders(<MainPage />, {
      preloadedState: {
        offers: {
          status: RequestStatus.Success,
          cityName: 'Paris',
          placeCards: [],
          // Остальные обязательные поля
          nearbyCards: [],
          offerCard: null,
          favoriteCards: []
        }
      }
    });

    expect(screen.getByTestId('main-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('main-content')).toBeNull();
  });
});
