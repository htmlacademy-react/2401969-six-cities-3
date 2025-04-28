import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { placeCards } from './mocks/mock-offers';
import { comments } from './mocks/mock-comments';
import { AuthorizationStatus } from './const';

const favoriteCards = placeCards.filter((card) => card.isFavorite);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const authStatus = AuthorizationStatus.Auth;

root.render(
  <React.StrictMode>
    <App placeCards={placeCards} favoriteCards={favoriteCards} comments={comments} authStatus={authStatus} />
  </React.StrictMode>
);
