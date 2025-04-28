import { PlaceCard } from '../place-card/place-card';
import { PlaceCardProps } from '../../mocks/mock-offers';
import { useState } from 'react';

type PlacesProps = {
  placeCards: PlaceCardProps[];
}


function PlacesList({placeCards}: PlacesProps): JSX.Element {
  const [activeOfferId, setActiveOffer] = useState<string | null>(null);

  const handleCardMouseEnter = (id: string) => {
    setActiveOffer(id);
  };
  // eslint-disable-next-line
  console.log(activeOfferId ? `Активный оффер: ${activeOfferId}` : 'Мимо');

  return (
    <div className="cities__places-list places__list tabs__content">
      {placeCards.map((card) => (
        <PlaceCard
          key={card.id}
          {...card}
          onMouseEnter={handleCardMouseEnter}
        />
      ))}
    </div>
  );
}

export { PlacesList };
