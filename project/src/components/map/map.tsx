import { Icon, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import { City } from '../../types/city';
import { Location } from '../../types/location';
import 'leaflet/dist/leaflet.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addLayerToMap } from '../../utils/utils';
import { setIsNeedMapLayerUpdate } from '../../store/data-process/data-process';
import { getIsNeedMapLayerUpdate } from '../../store/data-process/selectors';

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
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({ city, points, selectedPoint, mapClassName, style }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const dispatch = useAppDispatch();
  const isNeedMapLayerUpdate = useAppSelector(getIsNeedMapLayerUpdate);

  useEffect(() => {
    if (map) {
      if (isNeedMapLayerUpdate) {
        map.eachLayer((eachLayer) => eachLayer.remove());
        addLayerToMap(map);
      }

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
      dispatch(setIsNeedMapLayerUpdate(false));
    }
  }, [map, points, selectedPoint, isNeedMapLayerUpdate, dispatch]);


  return (
    <section
      className={`${mapClassName} map`}
      ref={mapRef}
      style={style}
      data-testid="map"
    >
    </section>);
}

export default Map;
