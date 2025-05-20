import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { placeCards } from './types/offers-types';
import { comments } from './types/comments-types';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const favoriteCards = placeCards.filter((card) => card.isFavorite);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App favoriteCards={favoriteCards} comments={comments} />
    </Provider>
  </React.StrictMode>
);
