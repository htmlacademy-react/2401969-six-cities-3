import { AppRoute } from '../../const';
import { PlaceCardProps } from '../../types/offers-types';
import { Link } from 'react-router-dom';

type CardProps = PlaceCardProps & {
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  place?: 'cities' | 'favorites' |'near-places';
}

function PlaceCard({
  id,
  title,
  type,
  price,
  rating,
  isPremium,
  isFavorite,
  previewImage,
  place = 'cities',
  onMouseEnter,
  onMouseLeave,
}: CardProps): JSX.Element {
  const handleMouseEnter = () => {
    onMouseEnter?.(id);
  };

  return (

    <article
      className={`${place}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >

      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}
      <div className={`${place}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offers}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={place === 'favorites' ? 150 : 260}
            height={place === 'favorites' ? 110 : 200}
            alt="Place image"
          />
        </Link>

      </div>
      <div className={`place-card__info ${place === 'favorites' ? 'favorites__card-info' : ''}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In favorites' : 'To favorites'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(Math.round(rating) / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offers}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>

  );
}

export { PlaceCard };
