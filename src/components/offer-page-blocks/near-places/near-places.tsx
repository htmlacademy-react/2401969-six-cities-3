import { PlaceCardProps } from '../../../types/offers-types';
import { PlaceCard } from '../../place-card/place-card';
import { MAX_NEAR_PLACES } from '../../../const';
import { memo } from 'react';

type NearPlacesProps = {
  cityPlaceCards: PlaceCardProps[];
}

const NearPlaces = memo(({ cityPlaceCards}: NearPlacesProps): JSX.Element => {
  const nearPlaceCards = cityPlaceCards.slice(0, MAX_NEAR_PLACES);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearPlaceCards.map((card) => (
          <PlaceCard
            key={card.id}
            {...card}
            place='near-places'
            isFavorite={card.isFavorite}
          />))}
      </div>
    </section>
  );
});

NearPlaces.displayName = 'NearPlaces';

export { NearPlaces };
