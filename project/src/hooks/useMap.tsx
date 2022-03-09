import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useState } from 'react';
import { City } from '../types/city';

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

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
    }
    map?.setView({ lat: latitude, lng: longitude }, zoom);
  }, [mapRef, map, latitude, longitude, zoom]);

  return map;
}

export default useMap;
