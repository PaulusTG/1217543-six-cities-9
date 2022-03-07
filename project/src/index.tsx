import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { cities } from './mocks/cities';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';

const Settings = {
  PLACES_COUNT: 312,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      placesCount={Settings.PLACES_COUNT}
      offers={offers}
      cities={cities}
      reviews={reviews}
    />
  </React.StrictMode>,
  document.getElementById('root'));
