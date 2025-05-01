import { PlacesSorting } from '../../../components/places-sorting/places-sorting';
import { PlacesList } from '../../../components/places-list/places-list';
import { PlaceCardProps } from '../../../mocks/mock-offers';
import { Map } from '../../../components/map/map';
import { useState } from 'react';

type MainContentProps = {
  cityPlaceCards: PlaceCardProps[];
  cityName: string;
}

function MainContent({ cityPlaceCards, cityName }: MainContentProps): JSX.Element {
  const [activeOfferId, setActiveOffer] = useState<string | null>(null);

  const handleCardMouseEnter = (id: string) => {
    setActiveOffer(id);
  };

  // eslint-disable-next-line
    console.log(activeOfferId ? `Активный оффер: ${activeOfferId}` : 'null');

  const activeLocation = activeOfferId
    ? cityPlaceCards.find((card) => card.id === activeOfferId)?.location
    : null;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cityPlaceCards.length} places to stay in {cityName}</b>
        <PlacesSorting />
        <PlacesList
          placeCards={cityPlaceCards}
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={() => setActiveOffer(null)}
        />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            city={cityPlaceCards[0].city}
            locations={cityPlaceCards.map((card) => card.location)}
            activeLocation={activeLocation}
          />
        </section>
      </div>
    </div>

  );
}

export { MainContent };
