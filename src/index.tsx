import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { placeCards } from './mocks/mock-offers';
import { comments } from './mocks/mock-comments';
import { AuthorizationStatus } from './const';
import { store } from './store/store';
import { Provider } from 'react-redux';

const favoriteCards = placeCards.filter((card) => card.isFavorite);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const authStatus = AuthorizationStatus.NotAuth;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App favoriteCards={favoriteCards} comments={comments} authStatus={authStatus} />
    </Provider>
  </React.StrictMode>
);
