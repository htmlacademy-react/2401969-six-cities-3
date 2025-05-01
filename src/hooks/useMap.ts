import { useEffect, useState } from 'react';
import { City } from '../mocks/mock-offers';
import L, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type UseMapProps = {
  mapRef: React.RefObject<HTMLDivElement>;
  city: City;
}

function useMap({ mapRef, city }: UseMapProps): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  // eslint-disable-next-line
  console.log('Карта создана?', map);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    // eslint-disable-next-line
    console.log('Инициализация карты...');

    const mapInstance = new Map(mapRef.current, {
      center: [city.location.latitude, city.location.longitude],
      zoom: city.location.zoom,
    });

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    )
      .addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();

    };
  }, [mapRef, city]);

  return map;
}

export { useMap };
