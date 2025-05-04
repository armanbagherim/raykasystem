"use client";

import { useEffect, useRef, useState, memo } from "react";
import mapboxgl from "@neshan-maps-platform/mapbox-gl";
import Image from "next/image";
import {
  TextField,
  InputAdornment,
  CircularProgress,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const DEFAULT_LOCATION = {
  lat: 35.65326,
  lng: 51.35471,
};

interface LocationState {
  lat: number | null;
  lng: number | null;
}

interface SearchResult {
  title: string;
  address: string;
  neighbourhood: string;
  region: string;
  type: string;
  category: string;
  location: {
    x: number;
    y: number;
  };
}

interface SearchResponse {
  count: number;
  items: SearchResult[];
}

export interface MapProps {
  height?: number | string;
  defaultLocation?: LocationState;
  onAddressChange?: (address: string) => void;
  onLocationChange?: (location: LocationState) => void;
  isAddressManuallyChanged?: boolean;
}

const Maps: React.FC<MapProps> = ({
  defaultLocation = DEFAULT_LOCATION,
  onAddressChange,
  onLocationChange,
  isAddressManuallyChanged = false,
  height = 200,
}) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isProgrammaticMove = useRef(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [currentLocation, setCurrentLocation] = useState<LocationState>({
    lat: null,
    lng: null,
  });
  const [lastLocation, setLastLocation] = useState<LocationState | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        mapType: mapboxgl.Map.mapTypes.neshanVector,
        container: mapContainerRef.current,
        zoom: 12,
        center: [defaultLocation.lng, defaultLocation.lat],
        mapKey: "web.0d81d4fa8d194f419aeb4cf313fd6a48",
        poi: false,
        traffic: false,
        trackResize: true,
        mapTypeControllerOptions: { show: false },
        minZoom: 2,
        maxZoom: 21,
      }) as unknown as mapboxgl.Map;
    }

    return () => mapRef.current?.remove();
  }, []);

  useEffect(() => {
    const neshanMap = mapRef.current;
    if (!neshanMap) return;

    const onMoveEnd = () => {
      if (isProgrammaticMove.current) return;

      const center = neshanMap.getCenter();
      const newLocation = { lat: center.lat, lng: center.lng };

      if (
        !lastLocation ||
        lastLocation.lat !== newLocation.lat ||
        lastLocation.lng !== newLocation.lng
      ) {
        setCurrentLocation(newLocation);
        setLastLocation(newLocation);
        onLocationChange?.(newLocation);
      }
    };

    neshanMap.on("moveend", onMoveEnd);

    return () => {
      neshanMap.off("moveend", onMoveEnd);
    };
  }, [lastLocation]);

  useEffect(() => {
    if (
      mapRef.current &&
      currentLocation.lat &&
      currentLocation.lng &&
      (currentLocation.lat !== lastLocation?.lat ||
        currentLocation.lng !== lastLocation?.lng)
    ) {
      mapRef.current.setCenter([currentLocation.lng, currentLocation.lat]);
      updateMarkerPosition(currentLocation.lng, currentLocation.lat);

      if (!isAddressManuallyChanged) {
        onAddressChange?.("آدرس به‌روزرسانی خواهد شد");
      }
    }
  }, [currentLocation, isAddressManuallyChanged, onAddressChange, lastLocation]);

  const updateMarkerPosition = (lng: number, lat: number) => {
    if (markerRef.current && mapRef.current) {
      const point = mapRef.current.project([lng, lat]);
      markerRef.current.style.left = `${point.x}px`;
      markerRef.current.style.top = `${point.y}px`;
    }
  };

  const handleSearch = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery.trim()) return;

    setIsSearching(true);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.neshan.org/v1/search?term=${encodeURIComponent(
            searchQuery
          )}&lat=${currentLocation.lat || DEFAULT_LOCATION.lat}&lng=${currentLocation.lng || DEFAULT_LOCATION.lng}`,
          {
            headers: {
              "Api-Key": "service.8cc8247dd8a4495bb5d7fdadbc278ed2",
            },
          }
        );

        const data: SearchResponse = await response.json();

        if (Array.isArray(data.items)) {
          setSearchResults(data.items);
          setIsSearchOpen(true);
        } else {
          setSearchResults([]);
          setIsSearchOpen(false);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
        setIsSearchOpen(false);
      } finally {
        setIsSearching(false);
      }
    }, 1000);
  };

  const handleResultClick = (result: SearchResult) => {
    const newLocation = {
      lat: result.location.y,
      lng: result.location.x,
    };

    isProgrammaticMove.current = true;

    setSearchQuery(result.title);
    setSearchResults([]);
    setIsSearchOpen(false);

    setCurrentLocation(newLocation);
    setLastLocation(newLocation);
    onLocationChange?.(newLocation);
    onAddressChange?.(result.address);

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [newLocation.lng, newLocation.lat],
        essential: true,
      });
    }

    setTimeout(() => {
      isProgrammaticMove.current = false;
    }, 500);
  };

  return (
    <div style={{ height: `${height}px`, width: "100%", position: "relative" }}>
      {/* Search Input */}
      <div className="absolute top-3 left-3 right-3 z-[10000] bg-white rounded-md shadow-md flex">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="جستجوی مکان..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputRef={searchInputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={handleSearch}
                  variant="contained"
                  color="primary"
                  className="min-w-[40px] h-[40px] flex items-center justify-center"
                >
                  {isSearching ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SearchIcon />
                  )}
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Tailwind Search Results */}
      {isSearchOpen && searchResults.length > 0 && (
        <div
          className="absolute top-[70px] left-3 right-3 z-[99999999999999] bg-white border border-gray-300 rounded-md shadow-lg max-h-[300px] overflow-y-auto"
          dir="rtl"
        >
          {searchResults.map((result, index) => (
            <div
              key={index}
              onClick={() => handleResultClick(result)}
              className="cursor-pointer px-4 py-3 border-b border-gray-100 hover:bg-gray-100 transition"
            >
              <div className="font-bold text-sm">{result.title}</div>
              <div className="text-xs text-gray-600 mt-1">{result.address}</div>
            </div>
          ))}
        </div>
      )}

      {/* Map Container */}
      <div
        ref={mapContainerRef}
        style={{ height: "100%", width: "100%", position: "relative" }}
      >
        <div
          ref={markerRef}
          className="marker"
          style={{ pointerEvents: "none" }}
        >
          <Image
            alt=""
            width={100}
            height={100}
            src={"/assets/map/img_pin.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Maps);
