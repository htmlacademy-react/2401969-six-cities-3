import { describe, it, expect, vi, beforeEach, MockedFunction } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { NavigateFunction, To } from 'react-router-dom';
import { LoginPage } from './login-page';
import { CITIES } from '../../const';
import { renderWithProviders } from '../../utils/mock-component';
import { toast } from 'react-toastify';

// Mocks
const mockNavigate = vi.fn<[To | number], void>() as MockedFunction<NavigateFunction>;
const mockUseLocation = vi.fn().mockReturnValue({
  state: { from: '/protected-route' },
  key: '',
  pathname: '',
  search: '',
  hash: ''
}) as MockedFunction<() => Location>;

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
  useNavigate: () => mockNavigate,
  useLocation: () => mockUseLocation(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('LoginPage', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    vi.clearAllMocks();
  });

  it('should render login form correctly', () => {
    renderWithProviders(<LoginPage />);

    it('should render login form correctly', () => {
      renderWithProviders(<LoginPage />);

      // Проверяем заголовок
      expect(screen.getByRole('heading', { name: /sign in/i, level: 1 })).toBeInTheDocument();

      // Проверяем поля формы
      expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

      // Проверяем кнопку
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
  });

  it('should display random city link', () => {
    renderWithProviders(<LoginPage />);

    // Находим ссылку на город по классу
    const cityLink = screen.getByTestId('city-link');
    expect(CITIES).toContain(cityLink.textContent?.trim());
  });

  it('should show password validation error', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    await user.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'invalid');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(vi.mocked(toast.error)).toHaveBeenCalledWith(
      'Password must contain at least one letter and one number'
    );
  });

  it('should submit valid form data', async () => {
    const user = userEvent.setup();
    const { mockAxios } = renderWithProviders(<LoginPage />);

    mockAxios.onPost('/login').reply(200);

    await user.type(screen.getByPlaceholderText('Email'), 'valid@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'correct1Pass');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(mockAxios.history.post.length).toBe(1);
  });

  it('should navigate after successful login', async () => {
    const user = userEvent.setup();
    const { mockAxios } = renderWithProviders(<LoginPage />);

    mockAxios.onPost('/login').reply(200);

    // Используем placeholder вместо label
    await user.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'valid1Pass');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(mockNavigate).toHaveBeenCalledWith(
      '/protected-route',
      {
        replace: true,
        state: null
      }
    );
  });
});
