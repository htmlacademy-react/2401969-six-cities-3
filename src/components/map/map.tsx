import { City, Location } from '../../mocks/mock-offers';
import { useRef } from 'react';
import { useMap } from '../../hooks/useMap';


type MapProps = {
  city: City;
  locations: Location[];
  activeLocation?: Location | null;
}

function Map({ city, locations, activeLocation }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);

  useMap({
    mapRef,
    city,
    locations,
    activeLocation
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
