import { PlacesSorting } from '../../../components/places-sorting/places-sorting';
import { PlacesList } from '../../../components/places-list/places-list';
import { PlaceCardProps } from '../../../types/offers-types';
import { Map } from '../../../components/map/map';
import { useActiveCard } from '../../../hooks/useActiveCard';
import { sortOffers } from '../../../utils';
import { useState, useMemo } from 'react';
import { SortOption, DEFAULT_SORT } from '../../../const';

type MainContentProps = {
  cityPlaceCards: PlaceCardProps[];
  cityName: string;
}

function MainContent({ cityPlaceCards, cityName }: MainContentProps): JSX.Element {
  const [currentSort, setCurrentSort] = useState<SortOption>(DEFAULT_SORT);

  const sortedPlaceCards = useMemo(
    () => sortOffers(cityPlaceCards, currentSort.value),
    [cityPlaceCards, currentSort.value]
  );

  const city = cityPlaceCards[0]?.city;

  const locations = useMemo(
    () => cityPlaceCards.map((card) => card.location),
    [cityPlaceCards]
  );

  const {
    activeLocation,
    handleCardMouseEnter,
    handleCardMouseLeave
  } = useActiveCard(cityPlaceCards);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cityPlaceCards.length} place{cityPlaceCards.length > 1 && 's'} to stay in {cityName}</b>
        <PlacesSorting
          currentSort={currentSort}
          onSortChange={setCurrentSort}
        />
        <PlacesList
          placeCards={sortedPlaceCards}
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
        />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            city={city}
            locations={locations}
            activeLocation={activeLocation}
          />
        </section>
      </div>
    </div>

  );
}

export { MainContent };
