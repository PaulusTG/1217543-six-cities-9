import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';

const Settings = {
  PLACES_COUNT: 312,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      placesCount={Settings.PLACES_COUNT}
      offers={offers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
