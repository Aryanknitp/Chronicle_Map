import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import { Search, Filter, X } from 'lucide-react';
import LeafletMap from '../components/map/LeafletMap';
import TimeSlider from '../components/map/TimeSlider';
import LayerToggle from '../components/map/LayerToggle';
import MapLayout from '../layouts/MapLayout';
import { useMap } from '../context/MapContext';
import { locationService, mediaService } from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

const MapPage = () => {
  const navigate = useNavigate();
  const {
    mapCenter,
    mapZoom,
    timeRange,
    activeLayer,
    markers,
    selectedLocation,
    updateTimeRange,
    updateMapView,
    updateLayer,
    selectLocation,
    addMarkers,
    setLoading,
  } = useMap();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  // Mock data - replace with actual API calls
  const mockMarkers = [
    {
      id: 1,
      latitude: 40.7128,
      longitude: -74.006,
      title: 'City Hall - 1920',
      description: 'Historic photograph of City Hall construction',
      year: 1920,
      mediaType: 'photo',
      mediaCount: 12,
      image: 'https://images.unsplash.com/photo-1760060776501-e3d2fa5d7332?w=400',
    },
    {
      id: 2,
      latitude: 40.7158,
      longitude: -74.0065,
      title: 'Main Street Market',
      description: 'Documents from the old market district',
      year: 1955,
      mediaType: 'document',
      mediaCount: 8,
    },
    {
      id: 3,
      latitude: 40.7108,
      longitude: -74.008,
      title: 'Community Center Oral History',
      description: 'Audio interviews with local residents',
      year: 1980,
      mediaType: 'audio',
      mediaCount: 5,
    },
  ];

  useEffect(() => {
    // Simulate loading markers
    setLoading(true);
    setTimeout(() => {
      addMarkers(mockMarkers);
      setLoading(false);
    }, 500);
  }, [timeRange, activeLayer]);

  const handleMarkerClick = (marker) => {
    selectLocation(marker);
    navigate(`/location/${marker.id}`);
  };

  const handleMapClick = (latlng) => {
    console.log('Map clicked at:', latlng);
  };

  const handleMapMove = (center, zoom) => {
    updateMapView([center.lat, center.lng], zoom);
  };

  const handleTimeRangeChange = (start, end) => {
    updateTimeRange(start, end);
  };

  const handleLayerChange = (layer) => {
    updateLayer(layer);
  };

  const filteredMarkers = markers.filter((marker) => {
    const inTimeRange = marker.year >= timeRange.start && marker.year <= timeRange.end;
    const matchesLayer = activeLayer === 'all' || marker.mediaType === activeLayer;
    const matchesSearch =
      !searchQuery ||
      marker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      marker.description.toLowerCase().includes(searchQuery.toLowerCase());

    return inTimeRange && matchesLayer && matchesSearch;
  });

  return (
    <MapLayout>
      <div className="relative h-full">
        {/* Map */}
        <LeafletMap
          center={mapCenter}
          zoom={mapZoom}
          markers={filteredMarkers}
          onMarkerClick={handleMarkerClick}
          onMapClick={handleMapClick}
          onMapMove={handleMapMove}
        />

        {/* Search Bar */}
        <div className="absolute top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md z-[1000]">
          <Card className="shadow-lg">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-stone-400" />
                <Input
                  type="text"
                  placeholder="Search locations, stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    className="p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="absolute top-20 right-4 z-[1000] md:hidden">
          <Button
            variant="default"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="shadow-lg"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="absolute top-20 md:top-4 right-4 z-[1000] space-y-4 w-72">
            <TimeSlider
              min={1800}
              max={2026}
              value={[timeRange.start, timeRange.end]}
              onChange={handleTimeRangeChange}
            />
            <LayerToggle activeLayer={activeLayer} onLayerChange={handleLayerChange} />
          </div>
        )}

        {/* Results Counter */}
        <div className="absolute bottom-4 left-4 z-[1000]">
          <Card className="shadow-lg">
            <CardContent className="p-3">
              <p className="text-sm font-medium text-stone-700">
                {filteredMarkers.length} locations found
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 z-[1000] hidden md:block">
          <Card className="shadow-lg">
            <CardContent className="p-3">
              <h4 className="text-xs font-semibold text-stone-900 mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                  <span className="text-stone-600">Photos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-stone-600">Documents</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span className="text-stone-600">Audio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                  <span className="text-stone-600">Video</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MapLayout>
  );
};

export default MapPage;