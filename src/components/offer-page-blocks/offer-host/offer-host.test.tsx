import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfferHost } from './offer-host';
import { createMockPlaceCard } from '../../../utils/utils';


describe('Component: OfferHost', () => {
  // Используем мок-функцию для создания данных хоста
  const mockOffer = createMockPlaceCard();
  const mockHost = mockOffer.host;
  const mockDescription = mockOffer.description;

  it('should render host info and description correctly', () => {
    render(<OfferHost host={mockHost} description={mockDescription} />);

    // Проверяем основные элементы
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText(mockHost.name)).toBeInTheDocument();

    const avatar = screen.getByAltText('Host avatar');
    expect(avatar).toHaveAttribute('src', mockHost.avatarUrl);

    // Проверяем статус "Pro" (так как в моке isPro: true)
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText(mockDescription)).toBeInTheDocument();
  });

  it('should not show "Pro" status if host is not pro', () => {
    // Модифицируем моковые данные через переопределение
    const nonProHost = createMockPlaceCard({
      host: {
        ...mockOffer.host, // Берём существующие данные хоста из мока
        isPro: false // Переопределяем только isPro
      }
    });
    render(<OfferHost host={nonProHost.host} description={nonProHost.description} />);

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });

  it('should apply pro-class when host is pro', () => {
    render(<OfferHost host={mockHost} description={mockDescription} />);

    const avatarWrapper = screen.getByTestId('host-avatar-wrapper'); // Нужно добавить data-testid в компонент
    expect(avatarWrapper).toHaveClass('offer__avatar-wrapper--pro');
  });
});
