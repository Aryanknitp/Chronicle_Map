import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Image, FileText, Mic, Video } from 'lucide-react';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker icons for different media types
const createCustomIcon = (color, type) => {
  // Extract SVG attributes from the lucide-react icon
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${getIconPath(type)}
  </svg>`;
  
  const iconHtml = `
    <div style="
      background-color: ${color};
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">
      ${iconSvg}
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

// Helper function to get SVG paths for different icon types
const getIconPath = (type) => {
  const paths = {
    photo: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    document: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    audio: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
    video: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>',
  };
  return paths[type] || '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>';
};

const getMarkerColor = (mediaType) => {
  const colors = {
    photo: '#d97706', // amber
    document: '#1e40af', // blue
    audio: '#16a34a', // green
    video: '#dc2626', // red
  };
  return colors[mediaType] || '#78716c'; // stone
};

// Component to handle map events
const MapEventHandler = ({ onMapClick, onMapMove }) => {
  const map = useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e.latlng);
      }
    },
    moveend: () => {
      if (onMapMove) {
        const center = map.getCenter();
        const zoom = map.getZoom();
        onMapMove(center, zoom);
      }
    },
  });

  return null;
};

// Component to update map view programmatically
const MapViewController = ({ center, zoom }) => {
  const map = useMap();
  const prevCenterRef = useRef(center);
  const prevZoomRef = useRef(zoom);
  
  useEffect(() => {
    // Only update if center or zoom actually changed
    const centerChanged = 
      !prevCenterRef.current || 
      prevCenterRef.current[0] !== center[0] || 
      prevCenterRef.current[1] !== center[1];
    const zoomChanged = prevZoomRef.current !== zoom;

    if (centerChanged || zoomChanged) {
      try {
        map.setView(center, zoom, { animate: false });
        prevCenterRef.current = center;
        prevZoomRef.current = zoom;
      } catch (error) {
        console.error('Error setting map view:', error);
      }
    }
  }, [center, zoom, map]);

  // Force invalidate size when component mounts and when window resizes
  useEffect(() => {
    const handleResize = () => {
      try {
        map.invalidateSize();
      } catch (error) {
        console.error('Error invalidating map size:', error);
      }
    };

    // Invalidate size on mount with a delay
    const timeoutId = setTimeout(() => {
      try {
        map.invalidateSize();
      } catch (error) {
        console.error('Error on initial invalidateSize:', error);
      }
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  return null;
};

const LeafletMap = ({
  center = [25.5941, 85.1376],
  zoom = 13,
  markers = [],
  onMarkerClick,
  onMapClick,
  onMapMove,
  className = '',
}) => {
  const mapRef = useRef(null);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={`w-full h-full ${className}`}
      ref={mapRef}
      zoomControl={true}
      scrollWheelZoom={true}
      preferCanvas={true}
      whenReady={(map) => {
        // Ensure map size is correct when ready
        setTimeout(() => {
          try {
            map.target.invalidateSize();
          } catch (error) {
            console.error('Error on whenReady invalidateSize:', error);
          }
        }, 100);
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapEventHandler onMapClick={onMapClick} onMapMove={onMapMove} />
      <MapViewController center={center} zoom={zoom} />

      {markers.map((marker) => {
        const icon = createCustomIcon(
          getMarkerColor(marker.mediaType),
          marker.mediaType
        );

        return (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
            icon={icon}
            eventHandlers={{
              click: () => onMarkerClick && onMarkerClick(marker),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                {marker.image && (
                  <img
                    src={marker.image}
                    alt={marker.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-semibold text-stone-900 mb-1">{marker.title}</h3>
                <p className="text-sm text-stone-600 mb-2">{marker.description}</p>
                <div className="text-xs text-stone-500">
                  {marker.year && <span className="block">Year: {marker.year}</span>}
                  {marker.mediaCount && (
                    <span className="block">{marker.mediaCount} items</span>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default LeafletMap;