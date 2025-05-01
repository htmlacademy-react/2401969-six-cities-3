import { PlaceCard } from '../place-card/place-card';
import { PlaceCardProps } from '../../mocks/mock-offers';

type PlacesProps = {
  placeCards: PlaceCardProps[];
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
}


function PlacesList({placeCards, onMouseEnter, onMouseLeave }: PlacesProps): JSX.Element {
  return (
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
  );
}

export { PlacesList };
