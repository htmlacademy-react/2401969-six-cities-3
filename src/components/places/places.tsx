import PlaceCard from '../../components/place-card/place-card';

type PlacesProps = {
  cardsCount: number;
}

function Places({cardsCount}: PlacesProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {Array.from({ length: cardsCount }, (_, index) => (<PlaceCard key={index} />))}
    </div>
  );
}

export default Places;
