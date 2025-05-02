"use client";

import { useEffect, useRef, useState, memo } from "react";
import mapboxgl from "@neshan-maps-platform/mapbox-gl";
import Image from "next/image";
import {
  TextField,
  MenuItem,
  Popper,
  Paper,
  ClickAwayListener,
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
        pitch: 0,
        center: [defaultLocation.lng, defaultLocation.lat],
        minZoom: 2,
        maxZoom: 21,
        trackResize: true,
        mapKey: "web.0d81d4fa8d194f419aeb4cf313fd6a48",
        poi: false,
        traffic: false,
        mapTypeControllerOptions: {
          show: false,
        },
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

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.neshan.org/v1/search?term=${encodeURIComponent(
          searchQuery
        )}&lat=${currentLocation.lat || DEFAULT_LOCATION.lat}&lng=${currentLocation.lng || DEFAULT_LOCATION.lng
        }`,
        {
          headers: {
            "Api-Key": "service.8cc8247dd8a4495bb5d7fdadbc278ed2",
          },
        }
      );

      const data: SearchResponse = await response.json();
      setSearchResults(data.items);
      setIsSearchOpen(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
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
      {/* Search Bar */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          right: "10px",
          zIndex: 9999999999,
          display: "flex",
          backgroundColor: "white",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="جستجوی مکان..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputRef={searchInputRef}
          sx={{
            "& .MuiOutlinedInput-root": {
              paddingRight: 0,
            },
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "0 16px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchIcon color="action" />
        </button>
      </div>

      {/* Search Results Dropdown */}
      <Popper
        open={isSearchOpen && searchResults.length > 0}
        anchorEl={searchInputRef.current}
        placement="bottom-start"
        style={{
          zIndex: 99999999999999,
          width: searchInputRef.current?.clientWidth,
          marginTop: "8px",
          overflowY: "auto",
          maxHeight: "300px",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          backgroundColor: "white",
          border: "1px solid #ccc",
        }}
      >
        <ClickAwayListener onClickAway={() => setIsSearchOpen(false)}>
          <Paper elevation={3}>
            {isSearching ? (
              <div style={{ padding: "16px", textAlign: "center" }}>
                در حال جستجو...
              </div>
            ) : (
              searchResults.map((result, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleResultClick(result)}
                  sx={{
                    whiteSpace: "normal",
                    borderBottom: "1px solid #eee",
                    padding: "8px 16px",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "bold" }}>{result.title}</div>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>
                      {result.address}
                    </div>
                  </div>
                </MenuItem>
              ))
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>

      {/* Map Container */}
      <div
        ref={mapContainerRef}
        style={{ height: "100%", width: "100%", position: "relative" }}
      >
        <div
          ref={markerRef}
          className="marker"
          style={{
            pointerEvents: "none",
          }}
        >
          <Image alt="" width={100} height={100} src={"/assets/map/img_pin.png"} />
        </div>
      </div>
    </div>
  );
};

export default memo(Maps);
