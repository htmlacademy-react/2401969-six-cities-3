import { City, Location } from '../../mocks/mock-offers';
import { useRef } from 'react';
import { useMap } from '../../hooks/useMap';
//import { Icon, Marker } from 'leaflet';


type MapProps = {
  city: City;
  locations: Location[];
}

function Map({ city, locations }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  useMap({
    mapRef,
    city,
    locations,
  });

  return (
    <div
      style={{
        height: '100%',
      }}
      ref={mapRef}
    >
    </div>
  );
}

export { Map };
