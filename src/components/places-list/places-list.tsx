import { PlaceCard } from '../place-card/place-card';
import { PlaceCardProps } from '../../types/offers-types';
import { memo } from 'react';

type PlacesProps = {
  placeCards: PlaceCardProps[];
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
}


const PlacesList = memo(({placeCards, onMouseEnter, onMouseLeave }: PlacesProps): JSX.Element => (
  <div className="cities__places-list places__list tabs__content">
    {placeCards.map((card) => (
      <PlaceCard
        key={card.id}
        {...card}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    ))}
  </div>
));

PlacesList.displayName = 'PlacesList';

export { PlacesList };
