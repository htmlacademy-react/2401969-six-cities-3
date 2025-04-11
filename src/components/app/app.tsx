import MainPage from '../pages/main-page';

type AppProps = {
  cardsCount: number;
  placesFound: number;
}

function App({cardsCount, placesFound}: AppProps): JSX.Element {
  return (
    <MainPage cardsCount={cardsCount} placesFound={placesFound} />
  );
}

export default App;
