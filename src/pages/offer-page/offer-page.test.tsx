import { screen } from '@testing-library/react';
import { OfferPage } from './offer-page';
import { RequestStatus } from '../../const';
import { renderWithProviders } from '../../utils/mock-component';

describe('OfferPage Component', () => {
  it('should show loading page when data is loading', () => {
    renderWithProviders(<OfferPage />, {
      preloadedState: {
        offers: {
          offer: null,
          nearby: [],
          status: RequestStatus.Loading,
          comments: []
        }
      }
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('loading-page')).toBeInTheDocument();
  });

  it('should display not found page when offer doesnt exist', () => {
    renderWithProviders(<OfferPage />, {
      preloadedState: {
        offers: {
          offer: null,
          nearby: [],
          status: RequestStatus.Success,
          comments: []
        }
      }
    });

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
  });
});
