import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReviewsForm } from './reviews-form';
import { MIN_REVIEW_LENGTH } from '../../../const';
import { renderWithProviders } from '../../../utils/mock-component';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('Component: ReviewsForm', () => {
  const mockOfferId = 'test-offer-id';
  const user = userEvent.setup();

  it('should render correctly', () => {
    renderWithProviders(<ReviewsForm offerId={mockOfferId} />);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('should enable submit button with valid data', async () => {
    renderWithProviders(<ReviewsForm offerId={mockOfferId} />);

    const textarea = screen.getByRole('textbox', { name: /your review/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    const fiveStarInput = screen.getByDisplayValue('5');

    // 1. Проверяем начальное состояние
    expect(submitButton).toBeDisabled();

    // 2. Выбираем рейтинг (без await - синхронная операция)
    user.click(fiveStarInput);

    // 3. Вводим текст (используем достаточно длинный текст)
    const longText = 'A'.repeat(MIN_REVIEW_LENGTH + 1);
    await user.type(textarea, longText);

    // 4. Проверяем состояние кнопки с таймаутом
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    }, { timeout: 3000 }); // Увеличиваем таймаут до 3 секунд
  });

  it('should disable submit button when text is too short', async () => {
    renderWithProviders(<ReviewsForm offerId={mockOfferId} />);

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const fourStarInput = screen.getByDisplayValue('4');

    await user.click(fourStarInput);
    await user.type(textarea, 'Short text');

    expect(submitButton).toBeDisabled();
  });
});
