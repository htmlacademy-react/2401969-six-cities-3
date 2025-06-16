import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './not-found-page';
import { AppRoute } from '../../const';
import { BrowserRouter } from 'react-router-dom';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  it('should have correct link to main page', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    const link = screen.getByRole('link', { name: 'Вернуться на главную' });
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });
});
