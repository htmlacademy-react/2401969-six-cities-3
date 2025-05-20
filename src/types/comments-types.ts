type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  }

type ReviewProps = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

const comments: ReviewProps[] = [
  {
    'id': '11',
    'date': '2025-03-24',
    'user': {
      'name': 'Oliver Conner',
      'avatarUrl': 'img/avatar-max.jpg',
      'isPro': false
    },
    'comment': 'The apartment was dirty, noisy, and not as described.',
    'rating': 1
  },

  {
    'id': '12',
    'date': '2025-04-14',
    'user': {
      'name': 'Pretty Woman',
      'avatarUrl': 'img/avatar-angelina.jpg',
      'isPro': true
    },
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of city.',
    'rating': 5
  }
];

export { type ReviewProps, comments };
