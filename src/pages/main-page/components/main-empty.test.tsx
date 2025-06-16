import { render, screen } from '@testing-library/react';
import { MainEmpty } from './main-empty';

describe('Component: MainEmpty', () => {
  it('should render correctly with city name', () => {
    const testCity = 'Paris';
    render(<MainEmpty cityName={testCity} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(
      screen.getByText(`We could not find any property available at the moment in ${testCity}`)
    ).toBeInTheDocument();
  });

  it('should display correct city name in description', () => {
    const testCity = 'Cologne';
    render(<MainEmpty cityName={testCity} />);

    expect(
      screen.getByText(`We could not find any property available at the moment in ${testCity}`)
    ).toBeInTheDocument();
  });
});
