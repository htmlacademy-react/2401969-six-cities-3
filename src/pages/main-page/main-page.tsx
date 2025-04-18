import { Header } from '../../components/header/header';
import { MainIndex } from '../../components/main-index/main-index';
import { MainIndexEmpty } from '../../components/main-index/main-index-empty';
import { PlaceCardProps } from '../../mocks/mocks';
import { AuthorizationStatus } from '../../const';

type MainPageProps = {
  placeCards: PlaceCardProps[];
  authStatus: AuthorizationStatus;
}

function MainPage({placeCards, authStatus}: MainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header authStatus={authStatus} />

      {placeCards && placeCards.length > 0 ? <MainIndex placeCards={placeCards}/> : <MainIndexEmpty />}

    </div>
  );
}

export { MainPage };

