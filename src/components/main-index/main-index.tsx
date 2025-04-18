import { Locations } from '../../components/locations/locations';
import { PlacesSorting } from '../../components/places-sorting/places-sorting';
import { PlacesList } from '../../components/places-list/places-list';
import { PlaceCardProps } from '../../mocks/mocks';

type MainIndexProps = {
  placeCards: PlaceCardProps[];
}

function MainIndex({ placeCards }: MainIndexProps): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <Locations />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{placeCards.length} places to stay in Amsterdam</b>
            <PlacesSorting />
            <PlacesList placeCards={placeCards} />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  );
}

export { MainIndex };
