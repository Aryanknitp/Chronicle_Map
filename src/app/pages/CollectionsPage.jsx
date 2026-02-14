import { useState } from 'react';
import { useNavigate } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { FolderOpen, Eye, Heart, ArrowRight } from 'lucide-react';

const CollectionsPage = () => {
  const navigate = useNavigate();

  // Mock collections data
  const collections = [
    {
      id: 1,
      title: 'Victorian Architecture',
      description: 'Historic buildings from the Victorian era showcasing architectural excellence',
      curator: 'Historical Society',
      itemCount: 45,
      thumbnail: 'https://images.unsplash.com/photo-1760060776501-e3d2fa5d7332?w=600',
      yearRange: '1880-1920',
      tags: ['architecture', 'victorian', 'buildings'],
      views: 1240,
      favorites: 89,
    },
    {
      id: 2,
      title: 'Market District Through the Decades',
      description: 'Evolution of the historic market district from 1920 to present day',
      curator: 'City Archives',
      itemCount: 67,
      thumbnail: 'https://images.unsplash.com/photo-1762436933065-fe6d7f51d4f3?w=600',
      yearRange: '1920-2020',
      tags: ['market', 'commerce', 'community'],
      views: 892,
      favorites: 54,
    },
    {
      id: 3,
      title: 'Oral Histories: Old Timers',
      description: 'Recorded interviews with long-time residents sharing their memories',
      curator: 'Community Center',
      itemCount: 23,
      thumbnail: 'https://images.unsplash.com/photo-1632580254134-94c4a73dab76?w=600',
      yearRange: '1950-2000',
      tags: ['oral history', 'interviews', 'memories'],
      views: 567,
      favorites: 42,
    },
    {
      id: 4,
      title: 'Industrial Revolution Era',
      description: 'Documents and photographs from the local industrial boom period',
      curator: 'Museum of History',
      itemCount: 89,
      yearRange: '1850-1920',
      tags: ['industry', 'factories', 'workers'],
      views: 1456,
      favorites: 102,
    },
    {
      id: 5,
      title: 'School Days: Education History',
      description: 'Schools, teachers, and students from the past century',
      curator: 'School Board Archives',
      itemCount: 112,
      yearRange: '1900-2020',
      tags: ['education', 'schools', 'children'],
      views: 723,
      favorites: 67,
    },
    {
      id: 6,
      title: 'Waterfront Development',
      description: 'Transformation of the waterfront from industrial port to public space',
      curator: 'Harbor Commission',
      itemCount: 34,
      yearRange: '1940-2015',
      tags: ['waterfront', 'harbor', 'development'],
      views: 445,
      favorites: 31,
    },
  ];

  const featuredCollection = collections[0];
  const regularCollections = collections.slice(1);

  return (
    <MainLayout>
      <div className="bg-stone-50 min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <FolderOpen className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-serif font-bold text-white mb-4">
              Curated Collections
            </h1>
            <p className="text-xl text-blue-50 max-w-2xl mx-auto">
              Explore themed collections curated by historians and community experts
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Featured Collection */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              Featured Collection
            </h2>
            <Card
              className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all group"
              onClick={() => navigate(`/collections/${featuredCollection.id}`)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={featuredCollection.thumbnail}
                    alt={featuredCollection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-amber-600 text-white">
                    Featured
                  </Badge>
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-sm text-stone-500 mb-3">
                    <span>{featuredCollection.itemCount} items</span>
                    <span>•</span>
                    <span>{featuredCollection.yearRange}</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-stone-900 mb-4">
                    {featuredCollection.title}
                  </h3>
                  <p className="text-lg text-stone-600 mb-6">
                    {featuredCollection.description}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-stone-500">
                      Curated by <span className="font-medium text-stone-700">{featuredCollection.curator}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-stone-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {featuredCollection.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {featuredCollection.favorites}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredCollection.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="bg-amber-700 hover:bg-amber-800">
                    Explore Collection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* All Collections */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              All Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularCollections.map((collection) => (
                <Card
                  key={collection.id}
                  className="overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
                  onClick={() => navigate(`/collections/${collection.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={collection.thumbnail}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {collection.title}
                      </h3>
                      <p className="text-white/90 text-sm">{collection.yearRange}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-stone-600 mb-4 line-clamp-2">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                      <span>{collection.itemCount} items</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {collection.views}
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {collection.favorites}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-stone-500">
                      by {collection.curator}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CollectionsPage;