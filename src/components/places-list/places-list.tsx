import { PlaceCard } from '../place-card/place-card';
import { PlaceCardProps } from '../../mocks/mocks';

type PlacesProps = {
  placeCards: PlaceCardProps[];
}


function PlacesList({placeCards}: PlacesProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {placeCards.map((card) => (
        <PlaceCard
          key={card.id}
          title={card.title}
          type={card.type}
          price={card.price}
          rating={card.rating}
          isPremium={card.isPremium}
          isFavorite={card.isFavorite}
          previewImage={card.previewImage}
        />
      ))}
    </div>
  );
}

export { PlacesList };
