import { Header } from '../../components/header/header';
import { AuthorizationStatus, MAX_NEAR_PLACES } from '../../const';
import { OfferCard } from '../../components/offer-page-blocks/offer-card/offer-card';
import { Reviews } from '../../components/review-blocks/reviews/reviews';
import { ReviewsForm } from '../../components/review-blocks/reviews-form/reviews-form';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from '../not-found-page/not-found-page';
import { OfferGallery } from '../../components/offer-page-blocks/offer-gallery/offer-gallery';
import { NearPlaces } from '../../components/offer-page-blocks/near-places/near-places';
import { Map } from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { clearCurrentOffer, clearNearbyOffers, fetchNearbyOffers, fetchOfferById } from '../../store/slices/offers-slice';
import { LoadingPage } from '../loading-page/loading-page';
import { selectAuthStatus, selectOfferPageData } from '../../store/selectors';
import { clearComments, fetchComments } from '../../store/slices/comments-slice';

function OfferPage(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  const {
    offerCard,
    comments,
    nearbyCards,
    isLoading,
    isNearbyLoading,
  } = useAppSelector(selectOfferPageData);

  const authStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOfferById(params.id));
      dispatch(fetchNearbyOffers(params.id));
      dispatch(fetchComments(params.id));
    }

    return () => {
      dispatch(clearCurrentOffer());
      dispatch(clearNearbyOffers());
      dispatch(clearComments());
    };
  }, [params.id, dispatch]);

  if (isLoading || isNearbyLoading) {
    return <LoadingPage />;
  }

  if (!offerCard) {
    return <NotFoundPage />;
  }

  const cityPlaceCards = [offerCard, ...nearbyCards.slice(0, MAX_NEAR_PLACES)];

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          {offerCard.images.length > 0 && <OfferGallery images={offerCard.images}/>}
          <div className="offer__container container">
            <div className="offer__wrapper">
              <OfferCard offerCard={offerCard} />
              <section className="offer__reviews reviews">
                {comments.length > 0 && <Reviews comments={comments} />}
                {authStatus === AuthorizationStatus.Auth && <ReviewsForm offerId={params.id} />}
              </section>
            </div>
          </div>
        </section>
        <div className="container">
          <section className="offer__map map">
            <Map
              city={offerCard.city}
              locations={cityPlaceCards.map((card) => card.location)}
              activeLocation={offerCard.location}
            />
          </section>
          {nearbyCards.length > 0 && <NearPlaces cityPlaceCards={nearbyCards}/>}
        </div>
      </main>
    </div>
  );
}

export { OfferPage };

