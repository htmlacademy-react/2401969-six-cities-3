import { PlaceCardProps } from '../../../types/offers-types';
import { PlaceCard } from '../../../components/place-card/place-card';

type MainFavoritesProps = {
  favoriteCards: PlaceCardProps[];
}

function FavoritesContent({ favoriteCards}: MainFavoritesProps): JSX.Element {
  const cardsByCity = favoriteCards.reduce<{ [key: string]: PlaceCardProps[] }>((acc, card) => {
    const city = card.city.name;
    if (!(city in acc)) {
      acc[city] = [];
    }
    acc[city].push(card);
    return acc;
  }, {});

  return (
    <div className="page__favorites-container container" data-testid="favorites-content">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {Object.entries(cardsByCity).map(([ city, cityCards ]) =>(
            <li className="favorites__locations-items" key={city}>
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>{city}</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {cityCards.map((card) => (
                  <PlaceCard
                    key={card.id}
                    {...card}
                    place='favorites'
                  />))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export { FavoritesContent };
