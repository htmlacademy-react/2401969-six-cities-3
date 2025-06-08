import { memo } from 'react';
import { PlaceCardProps } from '../../../types/offers-types';
import { FavoriteButton } from '../../favorite-button/favorite-button';
import { OfferHost } from '../offer-host/offer-host';
import { OfferInside } from '../offer-inside/offer-inside';


type OfferCardProps = {
  offerCard: PlaceCardProps;
}

const OfferCard = memo(({ offerCard }: OfferCardProps): JSX.Element => {
  const { id, title, description, type, price, rating, isPremium, isFavorite, bedrooms, goods, host, maxAdults, } = offerCard;

  const capacityTitle = `Max ${maxAdults} ${maxAdults > 1 ? 'adults' : 'adult'}`;
  const bedroomsTitle = `${bedrooms} ${bedrooms > 1 ? 'bedrooms' : 'bedroom'}`;

  return (
    <>
      {isPremium && (
        <div className="offer__mark">
          <span>Premium</span>
        </div>)}
      <div className="offer__name-wrapper">
        <h1 className="offer__name">
          {title}
        </h1>
        <FavoriteButton
          offerId={id}
          isFavorite={isFavorite}
          place={'offer'}
        />
      </div>
      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{ width: `${(Math.round(rating) / 5) * 100}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">{rating}</span>
      </div>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">
          {type}
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          {bedroomsTitle}
        </li>
        <li className="offer__feature offer__feature--adults">
          {capacityTitle}
        </li>
      </ul>
      <div className="offer__price">
        <b className="offer__price-value">&euro;{price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>
      <OfferInside goods={goods} />
      <OfferHost host={host} description={description} />
    </>
  );
});

OfferCard.displayName = 'OfferCard';

export { OfferCard };
