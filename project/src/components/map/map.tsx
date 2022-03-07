import { Icon, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { City } from '../../types/city';
import { Location } from '../../types/location';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: Location[];
  selectedPoint: Location | undefined | null;
  mapClassName: string;
  style: {
    width: string,
    margin: string,
  };
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ city, points, selectedPoint, mapClassName, style }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined &&
              point.latitude === selectedPoint?.latitude &&
              point.longitude === selectedPoint?.longitude
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return (
    <section
      className={`${mapClassName} map`}
      ref={mapRef}
      style={style}
    >
    </section>);
}

export default Map;
