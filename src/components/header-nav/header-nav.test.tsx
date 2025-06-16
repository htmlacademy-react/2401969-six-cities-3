import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { HeaderNav } from './header-nav';
import { AppRoute } from '../../const';
import { renderWithProviders } from '../../utils/mock-component';

describe('Component: HeaderNav', () => {
  const mockUnauthorizedState = {
    user: {
      authorizationStatus: 'NO_AUTH',
      user: null
    },
    offers: {
      favoriteCards: [] // Именно так в твоём сторе (не favoritesCards!)
    }
  };

  const mockAuthorizedState = {
    user: {
      authorizationStatus: 'AUTH',
      user: {
        email: 'test@test.com',
        avatarUrl: 'img/test-avatar.jpg'
      }
    },
    offers: {
      favoriteCards: [
        { id: '1', isFavorite: true },
        { id: '2', isFavorite: true }
      ]
    }
  };
  it('should render sign in link when user is not authorized', () => {
    renderWithProviders(<HeaderNav />, {
      preloadedState: mockUnauthorizedState
    });

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign in' }))
      .toHaveAttribute('href', AppRoute.Login);
  });

  it('should render user email and sign out link when user is authorized', () => {
    renderWithProviders(<HeaderNav />, {
      preloadedState: mockAuthorizedState
    });

    const { user } = mockAuthorizedState.user;

    // Проверяем что email отображается
    expect(screen.getByText(user.email)).toBeInTheDocument();

    // Проверяем количество избранных
    expect(screen.getByText('2')).toBeInTheDocument();

    // Проверяем кнопку выхода
    expect(screen.getByText('Sign out')).toBeInTheDocument();

    // Ищем ссылку по частичному совпадению текста
    const profileLink = screen.getByRole('link', {
      name: new RegExp(user.email)
    });
    expect(profileLink).toHaveAttribute('href', AppRoute.Favorites);

    // Дополнительно проверяем аватар
    const avatar = screen.getByAltText('User avatar');
    expect(avatar).toHaveAttribute('src', user.avatarUrl);
  });

  it('should show 0 when no favorites', () => {
    renderWithProviders(<HeaderNav />, {
      preloadedState: {
        ...mockAuthorizedState,
        offers: { favoriteCards: [] } // Пустой массив
      }
    });

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
