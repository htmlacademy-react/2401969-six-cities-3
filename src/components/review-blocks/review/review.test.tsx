import { render, screen } from '@testing-library/react';
import { Review } from './review';
import { CommentProps } from '../../../types/comments-types';
import { formatDateToMonthYear } from '../../../utils/utils';

// Мокаем утилиту форматирования даты
vi.mock('../../../utils/utils', () => ({
  formatDateToMonthYear: vi.fn().mockReturnValue('June 2023')
}));

describe('Review Component', () => {
  const mockComment: CommentProps = {
    id: '1',
    date: '2023-06-15T14:30:00.000Z',
    user: {
      name: 'John Doe',
      avatarUrl: 'path/to/avatar.jpg',
      isPro: true
    },
    comment: 'This is a test comment',
    rating: 4
  };

  it('should render correctly with all props', () => {
    render(<Review {...mockComment} />);

    expect(screen.getByText(mockComment.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
    expect(screen.getByText('June 2023')).toBeInTheDocument();

    const ratingElement = screen.getByTestId('rating-stars');
    expect(ratingElement).toHaveStyle({ width: '80%' }); // 4/5 = 80%
  });

  it('should display user avatar', () => {
    render(<Review {...mockComment} />);

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toHaveAttribute('src', mockComment.user.avatarUrl);
    expect(avatar).toHaveAttribute('width', '54');
    expect(avatar).toHaveAttribute('height', '54');
  });

  it('should format date correctly', () => {
    render(<Review {...mockComment} />);

    expect(formatDateToMonthYear).toHaveBeenCalledWith(mockComment.date);
    expect(screen.getByText('June 2023')).toBeInTheDocument();
  });

  it('should display correct rating visualization', () => {
    const testComment = { ...mockComment, rating: 3 };
    render(<Review {...testComment} />);

    const ratingElement = screen.getByTestId('rating-stars');
    expect(ratingElement).toHaveStyle({ width: '60%' }); // 3/5 = 60%
  });

  it('should have correct datetime attribute', () => {
    render(<Review {...mockComment} />);

    const timeElement = screen.getByText('June 2023');
    expect(timeElement).toHaveAttribute('datetime', mockComment.date);
  });
});
