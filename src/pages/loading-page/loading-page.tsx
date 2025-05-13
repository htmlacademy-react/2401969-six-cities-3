function LoadingPage(): JSX.Element {
  return (
    <main className="page__main page__main--index page__main--index-empty">
      <div className="cities__places-container cities__places-container--empty container">
        <div className="cities__status-wrapper tabs__content">
          <h1 className="cities__status">Loading...</h1>
        </div>
      </div>
    </main>
  );
}

export { LoadingPage };
