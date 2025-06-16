import { render, screen, fireEvent } from '@testing-library/react';
import { PlacesSorting } from './places-sorting';
import { SortOptions } from '../../const';

describe('PlacesSorting Component', () => {
  const mockSortChange = vi.fn();
  const currentSort = SortOptions[0];

  it('should render closed sort menu by default', () => {
    render(<PlacesSorting currentSort={currentSort} onSortChange={mockSortChange} />);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText(currentSort.value)).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should open sort menu when clicked', () => {
    render(<PlacesSorting currentSort={currentSort} onSortChange={mockSortChange} />);

    fireEvent.click(screen.getByText(currentSort.value));

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(SortOptions.length);
  });

  it('should call onSortChange when option is selected', () => {
    render(<PlacesSorting currentSort={currentSort} onSortChange={mockSortChange} />);

    fireEvent.click(screen.getByText(currentSort.value));
    fireEvent.click(screen.getByText(SortOptions[1].value));

    expect(mockSortChange).toHaveBeenCalledWith(SortOptions[1]);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should close menu after selecting an option', () => {
    render(<PlacesSorting currentSort={currentSort} onSortChange={mockSortChange} />);

    fireEvent.click(screen.getByText(currentSort.value));
    fireEvent.click(screen.getByText(SortOptions[1].value));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
