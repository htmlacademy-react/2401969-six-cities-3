import { PlacesSorting } from '../../../components/places-sorting/places-sorting';
import { PlacesList } from '../../../components/places-list/places-list';
import { PlaceCardProps } from '../../../mocks/mock-offers';

type MainIndexProps = {
  cityPlaceCards: PlaceCardProps[];
  cityName: string;
}

function MainContent({ cityPlaceCards, cityName }: MainIndexProps): JSX.Element {
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cityPlaceCards.length} places to stay in {cityName}</b>
        <PlacesSorting />
        <PlacesList placeCards={cityPlaceCards} />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map" />
      </div>
    </div>

  );
}

export { MainContent };
