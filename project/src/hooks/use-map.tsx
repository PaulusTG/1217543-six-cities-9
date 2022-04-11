import { Map } from 'leaflet';
import { MutableRefObject, useEffect, useState } from 'react';
import { City } from '../types/city';
import { addLayerToMap } from '../utils/utils';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  { location }: City,
): Map | null {
  const { latitude, longitude, zoom } = location;
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      addLayerToMap(instance);

      setMap(instance);
    }
    map?.setView({ lat: latitude, lng: longitude }, zoom);
  }, [mapRef, map, latitude, longitude, zoom]);

  return map;
}

export default useMap;
