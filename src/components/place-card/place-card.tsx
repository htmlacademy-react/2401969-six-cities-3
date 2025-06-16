import { AppRoute } from '../../const';
import { PlaceCardProps } from '../../types/offers-types';
import { Link } from 'react-router-dom';
import { FavoriteButton } from '../favorite-button/favorite-button';
import { memo } from 'react';
import { capitalize } from '../../utils/utils';

type CardProps = PlaceCardProps & {
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  place?: 'cities' | 'favorites' |'near-places';
}

const PlaceCard = memo(({
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
}: CardProps): JSX.Element => {
  const offerType = capitalize(type);
  const imageWidth = place === 'favorites' ? 150 : 260;
  const imageHeight = place === 'favorites' ? 110 : 200;
  const ratingWidth = `${(Math.round(rating) / 5) * 100}%`;

  return (
    <article
      className={`${place}__card place-card`}
      onMouseEnter={onMouseEnter ? () => onMouseEnter(id) : undefined}
      onMouseLeave={onMouseLeave}
      data-testid="place-card"
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
            width={imageWidth}
            height={imageHeight}
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
          <FavoriteButton
            offerId={id}
            isFavorite={isFavorite}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width:  ratingWidth}} data-testid="rating-stars"></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offers}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{offerType}</p>
      </div>
    </article>

  );
});

PlaceCard.displayName = 'PlaceCard';

export { PlaceCard };
