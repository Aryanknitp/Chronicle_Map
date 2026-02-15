import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, MapPin, Image, Filter, ChevronDown } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import MediaCard from '../components/MediaCard';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';

const TimelinePage = () => {
  const navigate = useNavigate();
  const [yearRange, setYearRange] = useState([1800, 2026]);
  const [sortBy, setSortBy] = useState('date-desc');
  const [filterLocation, setFilterLocation] = useState('all');

  // Mock timeline data
  const timelineEvents = [
    {
      year: 2020,
      events: [
        {
          id: 1,
          title: 'Community Center Renovation',
          description: 'Modern renovation of the historic community center',
          date: '2020-06-15',
          location: 'Community Center',
          type: 'photo',
          thumbnail: 'https://images.unsplash.com/photo-1632580254134-94c4a73dab76?w=400',
          mediaCount: 8,
        },
      ],
    },
    {
      year: 1985,
      events: [
        {
          id: 2,
          title: 'Downtown Festival Celebration',
          description: 'Annual downtown festival bringing the community together',
          date: '1985-08-20',
          location: 'Main Street',
          type: 'photo',
          thumbnail: 'https://images.unsplash.com/photo-1762436933065-fe6d7f51d4f3?w=400',
          mediaCount: 15,
        },
      ],
    },
    {
      year: 1950,
      events: [
        {
          id: 3,
          title: 'City Hall Grand Opening',
          description: 'Official opening ceremony of the new City Hall building',
          date: '1950-03-10',
          location: 'City Hall',
          type: 'photo',
          thumbnail: 'https://images.unsplash.com/photo-1760060776501-e3d2fa5d7332?w=400',
          mediaCount: 22,
        },
      ],
    },
    {
      year: 1920,
      events: [
        {
          id: 4,
          title: 'Market District Established',
          description: 'Original documents from the establishment of Market District',
          date: '1920-11-05',
          location: 'Market District',
          type: 'document',
          mediaCount: 12,
        },
      ],
    },
  ];

  const filteredEvents = timelineEvents.filter(
    (item) => item.year >= yearRange[0] && item.year <= yearRange[1]
  );

  return (
    <MainLayout>
      <div className="bg-stone-50 min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-800 py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Calendar className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-serif font-bold text-white mb-4">
              Timeline Explorer
            </h1>
            <p className="text-xl text-amber-50 max-w-2xl mx-auto">
              Journey through time and discover how your community has evolved over the centuries
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-stone-200 sticky top-16 z-40 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-stone-700">Time Range:</span>
                  <div className="flex-1 max-w-md">
                    <Slider
                      value={yearRange}
                      onValueChange={setYearRange}
                      min={1800}
                      max={2026}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-stone-500 mt-1">
                      <span>{yearRange[0]}</span>
                      <span>{yearRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Newest First</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="market">Market District</SelectItem>
                    <SelectItem value="waterfront">Waterfront</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-amber-200"></div>

            {/* Timeline Events */}
            <div className="space-y-12">
              {filteredEvents.map((yearGroup, yearIndex) => (
                <div key={yearGroup.year} className="relative">
                  {/* Year Marker */}
                  <div className="flex justify-center mb-8">
                    <div className="bg-amber-700 text-white px-6 py-2 rounded-full font-bold text-xl shadow-lg z-10 relative">
                      {yearGroup.year}
                    </div>
                  </div>

                  {/* Events for this year */}
                  <div className="space-y-8">
                    {yearGroup.events.map((event, eventIndex) => {
                      const isLeft = (yearIndex + eventIndex) % 2 === 0;

                      return (
                        <div
                          key={event.id}
                          className={`flex flex-col md:flex-row items-center gap-8 ${
                            isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                          }`}
                        >
                          {/* Content Card */}
                          <div className="w-full md:w-5/12">
                            <Card
                              className="overflow-hidden cursor-pointer hover:shadow-xl transition-all"
                              onClick={() => navigate(`/location/${event.id}`)}
                            >
                              {event.thumbnail && (
                                <div className="h-48 overflow-hidden">
                                  <img
                                    src={event.thumbnail}
                                    alt={event.title}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                              )}
                              <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-amber-700">
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                      month: 'long',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </span>
                                  <span className="text-xs text-stone-500">
                                    {event.mediaCount} items
                                  </span>
                                </div>
                                <h3 className="text-lg font-semibold text-stone-900 mb-2">
                                  {event.title}
                                </h3>
                                <p className="text-sm text-stone-600 mb-3">
                                  {event.description}
                                </p>
                                <div className="flex items-center text-sm text-stone-500">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {event.location}
                                </div>
                              </div>
                            </Card>
                          </div>

                          {/* Center Dot */}
                          <div className="hidden md:block w-2/12 flex justify-center">
                            <div className="w-4 h-4 rounded-full bg-amber-700 border-4 border-white shadow-lg"></div>
                          </div>

                          {/* Spacer for alternating layout */}
                          <div className="hidden md:block w-5/12"></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                <ChevronDown className="w-5 h-5 mr-2" />
                Load Earlier Events
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TimelinePage;