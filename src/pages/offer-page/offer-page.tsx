import { Header } from '../../components/header/header';
import { AuthorizationStatus, MAX_NEAR_PLACES, RequestStatus } from '../../const';
import { OfferCard } from '../../components/offer-page-blocks/offer-card/offer-card';
import { Reviews } from '../../components/review-blocks/reviews/reviews';
import { ReviewsForm } from '../../components/review-blocks/reviews-form/reviews-form';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from '../not-found-page/not-found-page';
import { OfferGallery } from '../../components/offer-page-blocks/offer-gallery/offer-gallery';
import { NearPlaces } from '../../components/offer-page-blocks/near-places/near-places';
import { Map } from '../../components/map/map';
import { useAppSelector, useCommentsAction, useOffersActions } from '../../store/hooks';
import { useEffect, useMemo } from 'react';
import { LoadingPage } from '../loading-page/loading-page';
import { selectOfferPageData, selectSortedComments } from '../../store/selectors';
import { userSelectors } from '../../store/slices/user-slice';
import { Location } from '../../types/offers-types';


function OfferPage(): JSX.Element {
  const { id } = useParams();

  const {
    fetchOfferById,
    fetchNearbyOffers,
    clearCurrentOffer,
    clearNearbyOffers
  } = useOffersActions();

  const { fetchComments, clearComments } = useCommentsAction();

  const {
    offerCard,
    nearbyCards,
    status,
  } = useAppSelector(selectOfferPageData);

  const comments = useAppSelector(selectSortedComments);

  const authStatus = useAppSelector(userSelectors.authStatus);

  useEffect(() => {
    if (id) {
      fetchOfferById(id);
      fetchNearbyOffers(id);
      fetchComments(id);
    }

    return () => {
      clearCurrentOffer();
      clearNearbyOffers();
      clearComments();
    };
  }, [
    id,
    fetchOfferById,
    fetchNearbyOffers,
    fetchComments,
    clearCurrentOffer,
    clearNearbyOffers,
    clearComments,
  ]);

  const cityPlaceCards = useMemo(
    () => [offerCard, ...nearbyCards.slice(0, MAX_NEAR_PLACES)],
    [nearbyCards, offerCard]
  );

  const locations = useMemo<Location[]>(
    () => cityPlaceCards
      .map((card) => card?.location)
      .filter((location): location is Location => location !== null),
    [cityPlaceCards]
  );

  if (status === RequestStatus.Loading) {
    return <LoadingPage />;
  }

  if (!offerCard) {
    return <NotFoundPage />;
  }

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
                {authStatus === AuthorizationStatus.Auth && <ReviewsForm offerId={id} />}
              </section>
            </div>
          </div>
        </section>
        <div className="container">
          <section className="offer__map map">
            <Map
              city={offerCard.city}
              locations={locations}
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

