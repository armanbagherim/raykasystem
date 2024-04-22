import type { FunctionComponent } from "react";

import mapboxgl from "mapbox-gl";
import React, { memo, useEffect, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import { Box } from "@mui/material";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmFtaW5tb2hhIiwiYSI6ImNscnc1dGU1aTEwMDEyam1yMXRnbmVqYzEifQ.OKYpf7J9BpjWYLZDOGUX1Q";

mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  () => {},
  true // Lazy load the plugin
);

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
}
const Map: FunctionComponent<MapProps> = ({
  defaultLocation = DEFAULT_LOCATION,
  onAddressChange,
  onLocationChange,
  height = 200,
}) => {
  const [location, setLocation] = useState<LocationState>(defaultLocation);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  useEffect(() => {
    setLocation(defaultLocation);
  }, [defaultLocation]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.teh-1.snappmaps.ir/reverse/v1/?lat=${location.lat}&lon=${location.lng}&type=driver&display=false`,
        {
          method: "GET",
          headers: {
            "X-Smapp-Key": "214906b54f2b776d0fcd5ef52b128c11",
          },
        }
      );
      const data = await response.json();

      const address = (
        data.result.components as {
          name: string;
          type: string;
        }[]
      )
        .filter((item) => {
          return (
            !!item.name &&
            item.type !== "city" &&
            item.type !== "province" &&
            item.type !== "poi"
          );
        })
        .map((item) => {
          return item.name;
        })
        .reverse()
        .join("، ");

      onAddressChange?.(address);
    } catch {
      // TODO: should be handled later
    }
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "https://tile.snappmaps.ir/styles/snapp-style/style.json",
      center: [location.lng, location.lat],
      zoom: 12,
    });

    const mapMarker = document.createElement("img");
    mapMarker.src = "/assets/map/img_pin.png";
    mapMarker.style.width = "144px";
    mapMarker.style.height = "158px";

    const marker = new mapboxgl.Marker({
      element: mapMarker,
    })
      .setLngLat([location.lng, location.lat])
      .addTo(map);

    map.on("move", () => {
      const center = map.getCenter();
      const newLocation: LocationState = {
        lat: +center.lat.toFixed(6),
        lng: +center.lng.toFixed(6),
      };

      setLocation(newLocation);

      onLocationChange?.(newLocation);

      setIsTouched(true);
      marker.setLngLat([center.lng, center.lat]);
    });
  }, [defaultLocation]);

  useEffect(() => {
    if (!isTouched) {
      return;
    }

    const timeOut = setTimeout(fetchData, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [location]);

  return (
    <Box className="relative w-[950px] h-96">
      <Box id="map" style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};

export default memo(Map);
