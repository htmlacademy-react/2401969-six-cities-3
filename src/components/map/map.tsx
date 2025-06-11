import { City, Location } from '../../types/offers-types';
import { useRef } from 'react';
import { useMap } from '../../hooks/use-map';


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
