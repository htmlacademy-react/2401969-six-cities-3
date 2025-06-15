import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingPage } from './loading-page';

describe('Component: Loading screen', () => {
  it('should render correct', () => {
    const expectedText = /Loading/i;

    render(<LoadingPage />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
