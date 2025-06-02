import { memo, useCallback } from 'react';
import { useAppSelector, useOffersActions } from '../../store/hooks';
import { userSelectors } from '../../store/slices/user-slice';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type FavoriteButtonProps = {
  offerId: string;
  isFavorite: boolean;
  place?: 'place-card' | 'offer';
}
const FavoriteButton = memo(({ offerId, isFavorite, place = 'place-card' }: FavoriteButtonProps): JSX.Element => {
  const { toggleFavorite } = useOffersActions();
  const user = useAppSelector(userSelectors.user);
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (!user) {
      navigate(AppRoute.Login, {
        state: { from: location.pathname }
      });
    }

    toggleFavorite({ offerId, status: isFavorite ? 0 : 1});
  },[isFavorite, offerId, toggleFavorite, user, navigate]);

  return (
    <button
      className={`${place}__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
      type="button"
      onClick={handleClick}
    >
      <svg
        className="place-card__bookmark-icon"
        width={place === 'offer' ? 31 : 18}
        height={place === 'offer' ? 33 : 19}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In favorites' : 'To favorites'}
      </span>
    </button>
  );
});

FavoriteButton.displayName = 'FavoriteButton';

export { FavoriteButton };
