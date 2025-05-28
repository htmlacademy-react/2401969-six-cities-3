import { useOffersActions } from '../../store/hooks';

type FavoriteButtonProps = {
  offerId: string;
  isFavorite: boolean;
  place?: 'place-card' | 'offer';
}
function FavoriteButton ({ offerId, isFavorite, place = 'place-card' }: FavoriteButtonProps): JSX.Element {
  const { toggleFavorite } = useOffersActions();

  const handleClick = () => {
    toggleFavorite({ offerId, status: isFavorite ? 0 : 1});
  };

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
}

export { FavoriteButton };
