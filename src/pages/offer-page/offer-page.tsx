import { Header } from '../../components/header/header';
import { AuthorizationStatus } from '../../const';
import { PlaceCardProps } from '../../mocks/mock-offers';
import { ReviewProps } from '../../mocks/mock-comments';
import { OfferCard } from '../../components/offer-card/offer-card';
import { Reviews } from '../../components/reviews/reviews';
import { ReviewsForm } from '../../components/reviews-form/reviews-form';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from '../not-found-page/not-found-page';
import { OfferGallery } from '../../components/offer-gallery/offer-gallery';
import { NearPlaces } from '../../components/near-places/near-places';
import { Map } from '../../components/map/map';

type OfferPageProps = {
  placeCards: PlaceCardProps[];
  comments: ReviewProps[];
  authStatus: AuthorizationStatus;
}

function OfferPage({ placeCards, comments, authStatus }: OfferPageProps): JSX.Element {
  const params = useParams();
  const offerCard = placeCards.find((card) => card.id === params.id);

  if (!offerCard) {
    return <NotFoundPage />;
  }

  const cityName = offerCard?.city.name;
  const nearPlaceCards = placeCards
    .filter((card) => card.city.name === cityName && card.id !== offerCard.id);
  const cityPlaceCards = [offerCard, ...nearPlaceCards];


  return (
    <div className="page">
      <Header authStatus={authStatus} />

      <main className="page__main page__main--offer">
        <section className="offer">
          {offerCard.images.length > 0 && <OfferGallery images={offerCard.images}/>}
          <div className="offer__container container">
            <div className="offer__wrapper">
              <OfferCard offerCard={offerCard} />
              <section className="offer__reviews reviews">
                {comments.length > 0 && <Reviews comments={comments} />}
                {authStatus === AuthorizationStatus.Auth && <ReviewsForm />}
              </section>
            </div>
          </div>
        </section>
        <div className="container">
          <section className="offer__map map">
            <Map
              city={cityPlaceCards[0].city}
              locations={cityPlaceCards.map((card) => card.location)}
              activeLocation={offerCard.location}
            />
          </section>
          {cityPlaceCards.length > 0 && <NearPlaces cityPlaceCards={nearPlaceCards}/>}
        </div>
      </main>
    </div>
  );
}

export { OfferPage };

