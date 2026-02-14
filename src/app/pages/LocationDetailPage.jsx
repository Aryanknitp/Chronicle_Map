import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import MediaCard from '../components/MediaCard';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { locationService, mediaService } from '../services/api';
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Image as ImageIcon, Clock, Edit, Flag, FileText, Mic, Video, CheckCircle } from 'lucide-react';

const LocationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockLocation = {
      id: parseInt(id),
      name: 'Historic City Hall',
      description:
        'The original City Hall building was constructed in 1890 and served as the center of municipal government for over 80 years. The building showcases Victorian Gothic architecture and has been witness to countless historic events.',
      address: '123 Main Street, Downtown',
      latitude: 40.7128,
      longitude: -74.006,
      established: 1890,
      demolished: null,
      mediaCount: 45,
      verified: true,
      tags: ['architecture', 'government', 'victorian', 'downtown'],
    };

    const mockMedia = [
      {
        id: 1,
        title: 'City Hall Construction - 1890',
        description: 'Original construction photograph',
        type: 'photo',
        year: 1890,
        thumbnail: 'https://images.unsplash.com/photo-1760060776501-e3d2fa5d7332?w=400',
        verified: true,
        contributor: 'Historical Society',
        tags: ['construction', 'vintage'],
      },
      {
        id: 2,
        title: 'Building Plans and Blueprints',
        description: 'Original architectural drawings',
        type: 'document',
        year: 1889,
        verified: true,
        contributor: 'City Archives',
        tags: ['blueprints', 'architecture'],
      },
      {
        id: 3,
        title: 'Oral History: Former Mayor Interview',
        description: 'Interview with Mayor Johnson about City Hall',
        type: 'audio',
        year: 1975,
        verified: true,
        contributor: 'Local Radio Station',
        tags: ['oral history', 'politics'],
      },
    ];

    setLocation(mockLocation);
    setMedia(mockMedia);
    setLoading(false);
  }, [id]);

  const handleMediaClick = (mediaItem) => {
    navigate(`/media/${mediaItem.id}`);
  };

  const handleViewOnMap = () => {
    navigate(`/map?location=${id}`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
            <p className="text-stone-600">Loading location...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!location) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-stone-600">Location not found</p>
            <Button onClick={() => navigate('/map')} className="mt-4">
              Return to Map
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const mediaByType = {
    photo: media.filter((m) => m.type === 'photo'),
    document: media.filter((m) => m.type === 'document'),
    audio: media.filter((m) => m.type === 'audio'),
    video: media.filter((m) => m.type === 'video'),
  };

  return (
    <MainLayout>
      <div className="bg-stone-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-amber-50 to-stone-100 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4 text-stone-600 hover:text-stone-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
                      {location.name}
                    </h1>
                    {location.verified && (
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified Location
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <p className="text-lg text-stone-600 mb-6">{location.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-stone-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-amber-700" />
                    <span>{location.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-amber-700" />
                    <span>Established {location.established}</span>
                  </div>
                  <div className="flex items-center">
                    <ImageIcon className="w-4 h-4 mr-2 text-amber-700" />
                    <span>{location.mediaCount} items preserved</span>
                  </div>
                </div>

                {location.tags && location.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {location.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleViewOnMap}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      View on Map
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      View Timeline
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Edit className="w-4 h-4 mr-2" />
                      Suggest Edit
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Flag className="w-4 h-4 mr-2" />
                      Report Issue
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Media Gallery */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                All ({media.length})
              </TabsTrigger>
              <TabsTrigger value="photo">
                <ImageIcon className="w-4 h-4 mr-2" />
                Photos ({mediaByType.photo.length})
              </TabsTrigger>
              <TabsTrigger value="document">
                <FileText className="w-4 h-4 mr-2" />
                Documents ({mediaByType.document.length})
              </TabsTrigger>
              <TabsTrigger value="audio">
                <Mic className="w-4 h-4 mr-2" />
                Audio ({mediaByType.audio.length})
              </TabsTrigger>
              <TabsTrigger value="video">
                <Video className="w-4 h-4 mr-2" />
                Video ({mediaByType.video.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {media.map((item) => (
                  <MediaCard key={item.id} media={item} onClick={handleMediaClick} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="photo">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaByType.photo.map((item) => (
                  <MediaCard key={item.id} media={item} onClick={handleMediaClick} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="document">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaByType.document.map((item) => (
                  <MediaCard key={item.id} media={item} onClick={handleMediaClick} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audio">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaByType.audio.map((item) => (
                  <MediaCard key={item.id} media={item} onClick={handleMediaClick} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="video">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaByType.video.map((item) => (
                  <MediaCard key={item.id} media={item} onClick={handleMediaClick} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Community Notes */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Community Notes & Context</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-stone-600 mb-4">
                This location has been verified by local historians. Additional information
                and context have been added to help visitors understand its historical
                significance.
              </p>
              <Button variant="outline">Add Your Note</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default LocationDetailPage;