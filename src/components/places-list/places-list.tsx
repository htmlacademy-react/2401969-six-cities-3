import { PlaceCard } from '../place-card/place-card';
import { PlaceCardProps } from '../../mocks/mocks';
import { useState } from 'react';

type PlacesProps = {
  placeCards: PlaceCardProps[];
}


function PlacesList({placeCards}: PlacesProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<string | null>(null);
  const handleCardMouseEnter = (id: string) => {
    setActiveOffer(id);
  };
  const handleCardMouseLeave = () => {
    setActiveOffer(null);
  };
  // eslint-disable-next-line
  console.log(activeOffer ? `Активный оффер: ${activeOffer}` : 'Мимо');

  return (
    <div className="cities__places-list places__list tabs__content">
      {placeCards.map((card) => (
        <PlaceCard
          key={card.id}
          {...card}
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
        />
      ))}
    </div>
  );
}

export { PlacesList };
