import { createContext, useContext, useState, useCallback } from 'react';

const MapContext = createContext();

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};

export const MapProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); // Default to NYC
  const [mapZoom, setMapZoom] = useState(13);
  const [timeRange, setTimeRange] = useState({ start: 1800, end: 2026 });
  const [activeLayer, setActiveLayer] = useState('all'); // all, photos, documents, audio, video
  const [searchRadius, setSearchRadius] = useState(5); // km
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateTimeRange = useCallback((start, end) => {
    setTimeRange({ start, end });
  }, []);

  const updateMapView = useCallback((center, zoom) => {
    setMapCenter(center);
    setMapZoom(zoom);
  }, []);

  const selectLocation = useCallback((location) => {
    setSelectedLocation(location);
    if (location) {
      setMapCenter([location.latitude, location.longitude]);
    }
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  const updateLayer = useCallback((layer) => {
    setActiveLayer(layer);
  }, []);

  const addMarkers = useCallback((newMarkers) => {
    setMarkers(newMarkers);
  }, []);

  const clearMarkers = useCallback(() => {
    setMarkers([]);
  }, []);

  const value = {
    selectedLocation,
    mapCenter,
    mapZoom,
    timeRange,
    activeLayer,
    searchRadius,
    markers,
    loading,
    setLoading,
    updateTimeRange,
    updateMapView,
    selectLocation,
    clearSelection,
    updateLayer,
    setSearchRadius,
    addMarkers,
    clearMarkers,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
