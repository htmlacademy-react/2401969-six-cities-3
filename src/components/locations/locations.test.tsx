import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { Locations, LocationsItem } from './locations';
import { AppRoute, CITIES } from '../../const';
import { renderWithProviders } from '../../utils/mock-component';
import { CityName } from '../../types/offers-types';

describe('Component: Locations', () => {
  const activeCity: CityName = CITIES[0];

  it('should render all cities from CITIES constant', () => {
    renderWithProviders(<Locations activeCity={activeCity} />);

    CITIES.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should mark active city with special class', () => {
    renderWithProviders(<Locations activeCity={activeCity} />);

    const activeLink = screen.getByRole('link', { name: activeCity });
    expect(activeLink).toHaveClass('tabs__item--active');
  });

  it('should have correct links for each city', () => {
    renderWithProviders(<Locations activeCity={activeCity} />);

    CITIES.forEach((city) => {
      const link = screen.getByRole('link', { name: city });
      expect(link).toHaveAttribute('href', `${AppRoute.Main}${city}`);
    });
  });

  it('should not mark inactive cities with special class', () => {
    renderWithProviders(<Locations activeCity={activeCity} />);

    const inactiveCities = CITIES.filter((city) => city !== activeCity);
    inactiveCities.forEach((city) => {
      const link = screen.getByRole('link', { name: city });
      expect(link).not.toHaveClass('tabs__item--active');
    });
  });
});

describe('Component: LocationsItem', () => {
  const testProps = {
    name: CITIES[0] ,
    isActive: true
  };

  it('should render city name', () => {
    renderWithProviders(<LocationsItem {...testProps} />);
    expect(screen.getByText(testProps.name)).toBeInTheDocument();
  });

  it('should apply active class when isActive=true', () => {
    renderWithProviders(<LocationsItem {...testProps} />);
    const link = screen.getByRole('link', { name: testProps.name });
    expect(link).toHaveClass('tabs__item--active');
  });

  it('should not apply active class when isActive=false', () => {
    renderWithProviders(<LocationsItem {...testProps} isActive={false} />);
    const link = screen.getByRole('link', { name: testProps.name });
    expect(link).not.toHaveClass('tabs__item--active');
  });

  it('should have correct link', () => {
    renderWithProviders(<LocationsItem {...testProps} />);
    const link = screen.getByRole('link', { name: testProps.name });
    expect(link).toHaveAttribute('href', `${AppRoute.Main}${testProps.name}`);
  });
});
