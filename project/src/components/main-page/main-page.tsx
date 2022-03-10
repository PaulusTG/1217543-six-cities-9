import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { City } from '../../types/city';
import { Location } from '../../types/location';
import Header from '../header/header';
import LocationsList from '../locations-list/locations-list';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import PlacesSorting from '../places-sorting/places-sorting';

type MainPageProps = {
  cities: City[];
  pagePath: string;
}

function MainPage({ cities, pagePath }: MainPageProps): JSX.Element {
  const { city, offers } = useAppSelector((state) => state);

  const currentCity = cities.filter((cityItem) => cityItem.name === city)[0];
  const points = offers.map((offer) => offer.location);

  const [selectedPoint, setSelectedPoint] = useState<Location | null | undefined>(null);

  const onPlacesListHover = (placeCardId: number) => {
    const currentPlace = offers.find((offer) => offer.id === placeCardId);

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
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city}</b>
              <PlacesSorting />
              <div className="cities__places-list places__list tabs__content">
                < PlacesList
                  offers={offers}
                  pagePath={pagePath}
                  onPlacesListHover={onPlacesListHover}
                />
              </div>
            </section>
            <div className="cities__right-section">
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
