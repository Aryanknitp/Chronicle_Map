import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import { Heart, MapPin, Calendar, Folder, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const SavedPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savedLocations, setSavedLocations] = useState([
    {
      id: 1,
      title: 'Historic Downtown Theater',
      description: 'Art Deco movie palace built in 1928',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop',
      year: 1928,
      mediaCount: 12,
      savedDate: '2024-01-15',
    },
    {
      id: 2,
      title: 'Old Railway Station',
      description: 'Former central hub of the city\'s transportation',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=300&fit=crop',
      year: 1915,
      mediaCount: 8,
      savedDate: '2024-01-20',
    },
  ]);

  const [savedCollections, setSavedCollections] = useState([
    {
      id: 1,
      name: 'Early 20th Century Architecture',
      description: 'Buildings and structures from the 1900s-1930s',
      itemCount: 24,
      coverImage: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=300&fit=crop',
      savedDate: '2024-02-01',
    },
  ]);

  const handleRemoveLocation = (id) => {
    setSavedLocations(savedLocations.filter(loc => loc.id !== id));
  };

  const handleRemoveCollection = (id) => {
    setSavedCollections(savedCollections.filter(col => col.id !== id));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Heart className="w-8 h-8 text-[#b85c38] fill-current" />
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">Saved Items</h1>
          </div>
          <p className="text-stone-600">
            Places and collections you've saved for later exploration
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="locations" className="space-y-6">
          <TabsList className="bg-stone-100 w-full md:w-auto">
            <TabsTrigger value="locations" className="flex items-center space-x-2 flex-1 md:flex-initial">
              <MapPin className="w-4 h-4" />
              <span>Locations ({savedLocations.length})</span>
            </TabsTrigger>
            <TabsTrigger value="collections" className="flex items-center space-x-2 flex-1 md:flex-initial">
              <Folder className="w-4 h-4" />
              <span>Collections ({savedCollections.length})</span>
            </TabsTrigger>
          </TabsList>

          {/* Saved Locations */}
          <TabsContent value="locations" className="space-y-4">
            {savedLocations.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-stone-300" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">
                    No saved locations yet
                  </h3>
                  <p className="text-stone-600 mb-6">
                    Start exploring and save locations to revisit them later
                  </p>
                  <Button onClick={() => navigate('/map')}>
                    Explore Map
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedLocations.map((location) => (
                  <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={location.image}
                        alt={location.title}
                        className="w-full h-48 object-cover cursor-pointer"
                        onClick={() => navigate(`/location/${location.id}`)}
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => handleRemoveLocation(location.id)}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                    <CardHeader>
                      <CardTitle className="cursor-pointer hover:text-[#1e5a8f]" onClick={() => navigate(`/location/${location.id}`)}>
                        {location.title}
                      </CardTitle>
                      <CardDescription>{location.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-stone-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{location.year}</span>
                        </div>
                        <Badge variant="secondary">
                          {location.mediaCount} items
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-stone-500">
                      Saved on {new Date(location.savedDate).toLocaleDateString()}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Saved Collections */}
          <TabsContent value="collections" className="space-y-4">
            {savedCollections.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Folder className="w-16 h-16 mx-auto mb-4 text-stone-300" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">
                    No saved collections yet
                  </h3>
                  <p className="text-stone-600 mb-6">
                    Browse curated collections and save your favorites
                  </p>
                  <Button onClick={() => navigate('/collections')}>
                    Browse Collections
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedCollections.map((collection) => (
                  <Card key={collection.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={collection.coverImage}
                        alt={collection.name}
                        className="w-full h-48 object-cover cursor-pointer"
                        onClick={() => navigate(`/collections/${collection.id}`)}
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => handleRemoveCollection(collection.id)}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                    <CardHeader>
                      <CardTitle className="cursor-pointer hover:text-[#1e5a8f]" onClick={() => navigate(`/collections/${collection.id}`)}>
                        {collection.name}
                      </CardTitle>
                      <CardDescription>{collection.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">
                        {collection.itemCount} items
                      </Badge>
                    </CardContent>
                    <CardFooter className="text-xs text-stone-500">
                      Saved on {new Date(collection.savedDate).toLocaleDateString()}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SavedPage;