import { Link } from 'react-router-dom';

function ErrorPage(): JSX.Element {
  return (
    <main className="page__main page__main--index page__main--index-empty">
      <div className="cities__places-container cities__places-container--empty container">
        <div className="cities__status-wrapper tabs__content">
          <h1 className="cities__status">Error: </h1>
          <Link className="cities__status-description" to="/">Вернуться на главную</Link>
        </div>
      </div>
    </main>
  );
}

export { ErrorPage };
