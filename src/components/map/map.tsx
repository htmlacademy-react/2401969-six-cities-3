import { PlaceCardProps } from '../../mocks/mock-offers';
import { useRef } from 'react';
import { useMap } from '../../hooks/useMap';

type MapProps = {
  placeCards: PlaceCardProps[];
}

function Map({ placeCards }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);

  useMap({
    mapRef,
    city: placeCards[0].city
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
