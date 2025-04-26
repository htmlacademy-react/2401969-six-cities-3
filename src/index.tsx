import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { placeCards } from './mocks/mocks';
import { AuthorizationStatus } from './const';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const authStatus = AuthorizationStatus.Auth;

root.render(
  <React.StrictMode>
    <App placeCards={placeCards} authStatus={authStatus} />
  </React.StrictMode>
);
