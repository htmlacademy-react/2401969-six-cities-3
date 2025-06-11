import { useEffect, useState } from 'react';
import { City, Location } from '../types/offers-types';
import L, { Map, Marker, Icon, LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MARKER_DEFAULT_URL, MARKER_ACTIVE_URL, TILE_LAYER_URL, TILE_LAYER_ATTRIBUTION } from '../const';

const defaultIcon = new Icon({
  iconUrl: MARKER_DEFAULT_URL,
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

const activeIcon = new Icon({
  iconUrl: MARKER_ACTIVE_URL,
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

type UseMapProps = {
  mapRef: React.RefObject<HTMLDivElement>;
  city: City;
  locations: Location[];
  activeLocation?: Location | null;
}

function useMap({ mapRef, city, locations, activeLocation }: UseMapProps): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const [markersLayer, setMarkersLayer] = useState<LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const mapInstance = new Map(mapRef.current, {
      center: [city.location.latitude, city.location.longitude],
      zoom: city.location.zoom,
    });

    L.tileLayer(
      TILE_LAYER_URL,
      {
        attribution: TILE_LAYER_ATTRIBUTION,
      },
    )
      .addTo(mapInstance);

    const layer = new L.LayerGroup().addTo(mapInstance);
    setMarkersLayer(layer);
    setMap(mapInstance);

    return () => {
      mapInstance.remove();

    };
  }, [mapRef, city]);

  useEffect(() => {
    if (!map || !markersLayer) {
      return;
    }

    markersLayer.clearLayers();

    locations.forEach((location) => {
      const marker = new Marker({
        lat: location.latitude,
        lng: location.longitude,
      });

      marker
        .setIcon(
          activeLocation &&
          location.latitude === activeLocation.latitude &&
          location.longitude === activeLocation.longitude
            ? activeIcon
            : defaultIcon
        )
        .addTo(markersLayer);
    });

  }, [map, markersLayer, locations, activeLocation]);

  return map;
}

export { useMap };
