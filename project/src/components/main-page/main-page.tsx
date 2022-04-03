import { useState } from 'react';
import { CITIES } from '../../constants';
import { useAppSelector } from '../../hooks';
import { Location } from '../../types/location';
import Header from '../header/header';
import LocationsList from '../locations-list/locations-list';
import MainEmpty from '../main-empty/main-empty';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import PlacesSorting from '../places-sorting/places-sorting';

function MainPage(): JSX.Element {
  const { city, currentOffers } = useAppSelector(({ DATA }) => DATA);

  const currentCity = CITIES.filter((cityItem) => cityItem.name === city)[0];
  const points = currentOffers.map((offer) => offer.location);

  const [selectedPoint, setSelectedPoint] = useState<Location | null | undefined>(null);

  const onPlacesListHover = (placeCardId: number) => {
    const currentPlace = currentOffers.find((offer) => offer.id === placeCardId);

    setSelectedPoint(currentPlace?.location);
  };

  const mapStyle = { width: '500px', margin: '0' };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList currentCity={city} />
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container ${currentOffers.length === 0 ? 'cities__places-container--empty' : ''} container`}>
            {currentOffers.length === 0 ?
              <MainEmpty /> :
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentOffers.length} places to stay in {city}</b>
                <PlacesSorting />
                <div className="cities__places-list places__list tabs__content">
                  < PlacesList
                    offers={currentOffers}
                    onPlacesListHover={onPlacesListHover}
                  />
                </div>
              </section>}
            <div className="cities__right-section" data-testid='cities__map'>
              < Map
                city={currentCity}
                points={points}
                selectedPoint={selectedPoint}
                mapClassName="cities__map"
                style={mapStyle}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
