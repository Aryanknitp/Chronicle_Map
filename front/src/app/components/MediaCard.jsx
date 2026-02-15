import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Heart, Share2, Download, Eye, Calendar, MapPin, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const MediaCard = ({ media, onClick }) => {
  const [isFavorited, setIsFavorited] = useState(media.isFavorited || false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Share functionality
  };

  const getMediaTypeColor = (type) => {
    const colors = {
      photo: 'bg-amber-100 text-amber-700',
      document: 'bg-blue-100 text-blue-700',
      audio: 'bg-green-100 text-green-700',
      video: 'bg-red-100 text-red-700',
    };
    return colors[type] || 'bg-stone-100 text-stone-700';
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
      onClick={() => onClick && onClick(media)}
    >
      {/* Media Preview */}
      <div className="relative h-48 bg-stone-100 overflow-hidden">
        {media.thumbnail || media.image ? (
          <img
            src={media.thumbnail || media.image}
            alt={media.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
            <Eye className="w-12 h-12 text-stone-400" />
          </div>
        )}

        {/* Overlay Actions */}
        <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            className="shadow-lg w-8 h-8"
            onClick={handleFavorite}
          >
            <Heart
              className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`}
            />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="shadow-lg w-8 h-8"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Media Type Badge */}
        <div className="absolute top-2 left-2">
          <Badge className={getMediaTypeColor(media.type)}>
            {media.type}
          </Badge>
        </div>

        {/* Verification Badge */}
        {media.verified && (
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-green-600 text-white">Verified</Badge>
          </div>
        )}
      </div>

      {/* Media Info */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-stone-900 mb-2 line-clamp-2">{media.title}</h3>
        
        {media.description && (
          <p className="text-sm text-stone-600 mb-3 line-clamp-2">{media.description}</p>
        )}

        <div className="space-y-2 text-xs text-stone-500">
          {media.year && (
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-2" />
              <span>{media.year}</span>
            </div>
          )}
          
          {media.location && (
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-2" />
              <span className="line-clamp-1">{media.location}</span>
            </div>
          )}
          
          {media.contributor && (
            <div className="flex items-center">
              <User className="w-3 h-3 mr-2" />
              <span className="line-clamp-1">{media.contributor}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {media.tags && media.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {media.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaCard;
