import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { Header } from './header';
import { AppRoute } from '../../const';
import { renderWithProviders } from '../../utils/mock-component';

describe('Component: Header', () => {
  it('should render logo with correct link', () => {
    const expectedAltText = /6 cities logo/i;
    renderWithProviders(<Header />);

    const logoLink = screen.getByRole('link', { name: expectedAltText });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveClass('header__logo-link--active');
    expect(logoLink).toHaveAttribute('href', AppRoute.Main);

    const logoImage = screen.getByAltText(expectedAltText);
    expect(logoImage).toBeInTheDocument();
  });

  it('should render navigation when withNav is true', () => {
    renderWithProviders(<Header />);

    expect(screen.getByTestId('header-nav')).toBeInTheDocument();
  });

  it('should not render navigation when withNav is false', () => {
    renderWithProviders(<Header withNav={false} />);

    expect(screen.queryByTestId('header-nav')).not.toBeInTheDocument();
  });
});
