import { useEffect, useState } from 'react';
import { City, Location } from '../mocks/mock-offers';
import L, { Map, Marker, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MARKER_DEFAULT_URL } from '../const';

const defaultIcon = new Icon({
  iconUrl: MARKER_DEFAULT_URL,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

type UseMapProps = {
  mapRef: React.RefObject<HTMLDivElement>;
  city: City;
  locations: Location[];
}

function useMap({ mapRef, city, locations }: UseMapProps): Map | null {
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

    locations.forEach((item) => {
      const marker = new Marker ({
        lat: item.latitude,
        lng: item.longitude,
      });
      marker
        .setIcon(defaultIcon)
        .addTo(mapInstance);
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();

    };
  }, [mapRef, city, locations]);

  return map;
}

export { useMap };
