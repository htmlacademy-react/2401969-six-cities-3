import { render, screen } from '@testing-library/react';
import { Reviews } from './reviews';
import { CommentProps } from '../../../types/comments-types';
import { MAX_COMMENTS } from '../../../const';

describe('Reviews Component', () => {
  const mockComments: CommentProps[] = [
    {
      id: '1',
      date: '2023-06-15T14:30:00.000Z',
      user: { name: 'John', avatarUrl: 'path1.jpg', isPro: true },
      comment: 'Comment 1',
      rating: 4
    },
    {
      id: '2',
      date: '2023-06-16T15:30:00.000Z',
      user: { name: 'Jane', avatarUrl: 'path2.jpg', isPro: false },
      comment: 'Comment 2',
      rating: 5
    },
    {
      id: '3',
      date: '2023-06-17T16:30:00.000Z',
      user: { name: 'Bob', avatarUrl: 'path3.jpg', isPro: true },
      comment: 'Comment 3',
      rating: 3
    }
  ];

  it('should render correct number of comments', () => {
    render(<Reviews comments={mockComments} />);

    // Проверяем заголовок с количеством
    const titleElement = screen.getByTestId('reviews-title');
    expect(titleElement).toHaveTextContent('Reviews · 3');

    // Проверяем отображение всех комментариев (до MAX_COMMENTS)
    const commentItems = screen.getAllByRole('listitem');
    expect(commentItems.length).toBe(Math.min(mockComments.length, MAX_COMMENTS));
  });

  it('should not display more than MAX_COMMENTS', () => {
    // Создаем больше комментариев чем MAX_COMMENTS
    const manyComments = Array.from({ length: MAX_COMMENTS + 5 }, (_, i) => ({
      ...mockComments[0],
      id: String(i + 1)
    }));

    render(<Reviews comments={manyComments} />);

    const commentItems = screen.getAllByRole('listitem');
    expect(commentItems.length).toBe(MAX_COMMENTS);
  });

  it('should display all comments when less than MAX_COMMENTS', () => {
    const fewComments = mockComments.slice(0, MAX_COMMENTS - 1);
    render(<Reviews comments={fewComments} />);

    const commentItems = screen.getAllByRole('listitem');
    expect(commentItems.length).toBe(fewComments.length);
  });

  it('should pass correct props to Review components', () => {
    render(<Reviews comments={mockComments} />);

    mockComments.slice(0, MAX_COMMENTS).forEach((comment) => {
      expect(screen.getByText(comment.user.name)).toBeInTheDocument();
      expect(screen.getByText(comment.comment)).toBeInTheDocument();
    });
  });
});
