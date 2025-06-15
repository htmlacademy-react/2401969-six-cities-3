import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { AppRoute } from '../../const';
import { MemoryRouter } from 'react-router-dom';
import { userReducer } from '../../store/slices/user-slice';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { commentsReducer } from '../../store/slices/comments-slice';
import { offersReducer } from '../../store/slices/offers-slice';


const createStore = () => configureStore({
  reducer: {
    offers: offersReducer,
    user: userReducer,
    comments: commentsReducer
  },
});

const renderHeader = (withNav = true) => render(
  <Provider store={createStore()}>
    <MemoryRouter>
      <Header withNav={withNav} />
    </MemoryRouter>
  </Provider>
);

describe('Component: Header', () => {

  it('should render logo with correct link', () => {
    renderHeader();

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveClass('header__logo-link--active');
    expect(logoLink).toHaveAttribute('href', AppRoute.Main);

    const logoImage = screen.getByAltText('6 cities logo');
    expect(logoImage).toBeInTheDocument();
  });

  it('should render navigation when withNav is true', () => {
    renderHeader();

    expect(screen.getByTestId('header-nav')).toBeInTheDocument();
  });

  it('should not render navigation when withNav is false', () => {
    renderHeader(false);

    expect(screen.queryByTestId('header-nav')).not.toBeInTheDocument();
  });
});
