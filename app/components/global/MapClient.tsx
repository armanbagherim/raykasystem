import type { FunctionComponent } from "react";
import React, { memo, useEffect, useState, useRef } from "react";
import { Map, Overlay, Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat, toLonLat } from "ol/proj";
import NeshanMap, {
  NeshanMapRef,
  Ol,
  OlMap,
} from "@neshan-maps-platform/react-openlayers";

const DEFAULT_LOCATION = {
  lat: 35.65326,
  lng: 51.35471,
};

interface LocationState {
  lat: number;
  lng: number;
}

export interface MapProps {
  height?: number | string;
  defaultLocation?: LocationState;
  onAddressChange?: (address: string) => void;
  onLocationChange?: (location: LocationState) => void;
  isAddressManuallyChanged?: boolean;
}

const Maps: FunctionComponent<MapProps> = ({
  defaultLocation = DEFAULT_LOCATION,
  onAddressChange,
  onLocationChange,
  isAddressManuallyChanged = false,
  height = 200,
}) => {
  const mapRef = useRef<NeshanMapRef | null>(null);
  const [ol, setOl] = useState<Ol>();
  const [olMap, setOlMap] = useState<OlMap>();
  const [marker, setMarker] = useState<Overlay | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationState>({
    lat: defaultLocation.lat,
    lng: defaultLocation.lng,
  });
  const [lastLocation, setLastLocation] = useState<LocationState | null>(null);

  const onInit = (ol: Ol, map: OlMap) => {
    setOl(ol);
    setOlMap(map);

    // Create the marker
    const markerElement = document.createElement("div");
    markerElement.className = "marker";
    markerElement.style.width = "114px";
    markerElement.style.height = "114px";
    markerElement.style.backgroundImage = "url('/assets/map/img_pin.png')";
    markerElement.style.backgroundSize = "contain";

    const markerFeature = new Feature({
      geometry: new Point(
        fromLonLat([defaultLocation.lng, defaultLocation.lat])
      ),
    });

    const markerOverlay = new Overlay({
      element: markerElement,
      positioning: "bottom-center",
      stopEvent: false,
      feature: markerFeature,
    });

    map.addOverlay(markerOverlay);
    setMarker(markerOverlay);

    // Animate the map to the default location
    setTimeout(() => {
      const view = map.getView();
      view.animate({
        center: fromLonLat([defaultLocation.lng, defaultLocation.lat]),
        zoom: 12,
        duration: 1000,
      });
    }, 2000);
  };

  useEffect(() => {
    if (olMap && marker) {
      olMap.on("moveend", () => {
        const center = olMap.getView().getCenter();
        if (center) {
          const [longitude, latitude] = toLonLat(center);
          const newLocation = { lat: latitude, lng: longitude };

          if (
            !lastLocation ||
            lastLocation.lat !== newLocation.lat ||
            lastLocation.lng !== newLocation.lng
          ) {
            onLocationChange?.(newLocation);

            setCurrentLocation(newLocation);
            setLastLocation(newLocation);
          }
        }
      });
    }
  }, [olMap, marker, ol, onLocationChange, lastLocation]);

  return (
    <NeshanMap
      mapKey="web.17a0c7f735234ae7acfa9eac73c9ca2e"
      defaultType="neshan"
      // center={{
      //   latitude: defaultLocation.lat,
      //   longitude: defaultLocation.lng,
      // }}
      style={{ height: `${height}px`, width: "100%" }}
      onInit={onInit}
      zoom={12}
    />
  );
};

export default memo(Maps);
