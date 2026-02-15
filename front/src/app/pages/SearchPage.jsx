import { useState } from 'react';
import { useNavigate } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import MediaCard from '../components/MediaCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search as SearchIcon, Filter } from 'lucide-react';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaType, setMediaType] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Mock search results
  const searchResults = [
    {
      id: 1,
      title: 'City Hall - 1920',
      description: 'Historic photograph of City Hall construction',
      year: 1920,
      type: 'photo',
      location: 'Downtown',
      thumbnail: 'https://images.unsplash.com/photo-1760060776501-e3d2fa5d7332?w=400',
      verified: true,
      contributor: 'Historical Society',
      tags: ['architecture', 'government'],
    },
    {
      id: 2,
      title: 'Market Street 1955',
      description: 'Bustling market day on Main Street',
      year: 1955,
      type: 'photo',
      location: 'Market District',
      thumbnail: 'https://images.unsplash.com/photo-1762436933065-fe6d7f51d4f3?w=400',
      verified: true,
      contributor: 'City Archives',
      tags: ['commerce', 'street life'],
    },
    {
      id: 3,
      title: 'Community Gathering 1980',
      description: 'Annual community festival',
      year: 1980,
      type: 'photo',
      location: 'Community Square',
      thumbnail: 'https://images.unsplash.com/photo-1632580254134-94c4a73dab76?w=400',
      verified: false,
      contributor: 'Local Resident',
      tags: ['festival', 'community'],
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search with filters
    console.log('Searching for:', searchQuery);
  };

  const handleMediaClick = (media) => {
    navigate(`/media/${media.id}`);
  };

  return (
    <MainLayout>
      <div className="bg-stone-50 min-h-screen">
        {/* Search Header */}
        <div className="bg-white border-b border-stone-200 py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-6">
              Search ChronicleMap
            </h1>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    type="text"
                    placeholder="Search locations, stories, people..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" className="bg-amber-700 hover:bg-amber-800">
                  Search
                </Button>
              </div>
            </form>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={mediaType} onValueChange={setMediaType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Media Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="photo">Photos</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>

              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2000s">2000-Present</SelectItem>
                  <SelectItem value="1900s">1900-1999</SelectItem>
                  <SelectItem value="1800s">1800-1899</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="market">Market District</SelectItem>
                  <SelectItem value="waterfront">Waterfront</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <p className="text-stone-600">
              Found <span className="font-semibold text-stone-900">{searchResults.length}</span> results
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result) => (
              <MediaCard key={result.id} media={result} onClick={handleMediaClick} />
            ))}
          </div>

          {searchResults.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <SearchIcon className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  No results found
                </h3>
                <p className="text-stone-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;