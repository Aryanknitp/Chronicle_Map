import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import MainLayout from '../layouts/MainLayout';
import { MapPin, Clock, Map, Upload, Heart, ArrowRight, Users, Shield } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Map,
      title: 'Geospatial Storytelling',
      description: 'Explore history through interactive maps. Every location has a story to tell.',
    },
    {
      icon: Clock,
      title: 'Timeline Explorer',
      description: 'Travel through time and discover how places have evolved over centuries.',
    },
    {
      icon: Users,
      title: 'Community Powered',
      description: 'Crowdsourced preservation by residents, historians, and local enthusiasts.',
    },
    {
      icon: Shield,
      title: 'Expert Verification',
      description: 'Historians and preservationists verify authenticity and add context.',
    },
  ];

  const featuredLocations = [
    {
      id: 1,
      name: 'Historic Downtown',
      image: 'https://images.unsplash.com/photo-1760060776501-e3d2fa5d7332?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpY2FsJTIwYnVpbGRpbmclMjB2aW50YWdlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MTA1MDkzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      stories: 127,
      yearRange: '1880-2025',
    },
    {
      id: 2,
      name: 'Old Market District',
      image: 'https://images.unsplash.com/photo-1762436933065-fe6d7f51d4f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBwaG90b2dyYXBoJTIwbWVtb3JpZXN8ZW58MXx8fHwxNzcxMDUwOTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      stories: 89,
      yearRange: '1920-2010',
    },
    {
      id: 3,
      name: 'Community Square',
      image: 'https://images.unsplash.com/photo-1632580254134-94c4a73dab76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzcxMDUwOTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      stories: 64,
      yearRange: '1950-2020',
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-stone-50 to-blue-50 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkN2NjYzQiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRoMTZ2MTZIMzZ2LTEyem0wLTMyYzAtMi4yMSAxLjc5LTQgNC00aDE2djE2SDM2VjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <MapPin className="w-16 h-16 text-amber-700" />
                <Clock className="w-8 h-8 text-amber-600 absolute -bottom-2 -right-2" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-6">
              Every Place Has a Story
            </h1>
            <p className="text-lg sm:text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
              ChronicleMap preserves disappearing local history through community-driven
              geospatial storytelling. Explore the past, contribute your memories, and help
              map the stories beneath familiar streets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/map')}
                className="bg-amber-700 hover:bg-amber-800 text-white"
              >
                <Map className="w-5 h-5 mr-2" />
                Explore Map
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/upload')}
                className="border-amber-700 text-amber-700 hover:bg-amber-50"
              >
                <Upload className="w-5 h-5 mr-2" />
                Contribute History
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-stone-900 mb-12">
            How ChronicleMap Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-stone-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-amber-700" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Locations Section */}
      <section className="py-16 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              Featured Locations
            </h2>
            <Link
              to="/map"
              className="text-amber-700 hover:text-amber-800 font-medium flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredLocations.map((location) => (
              <Card
                key={location.id}
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
                onClick={() => navigate(`/location/${location.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{location.name}</h3>
                    <p className="text-white/90 text-sm">{location.yearRange}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center text-stone-600">
                    <Heart className="w-4 h-4 mr-2" />
                    <span className="text-sm">{location.stories} stories preserved</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-700 to-amber-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">
            Help Preserve History Before It's Lost
          </h2>
          <p className="text-amber-50 text-lg mb-8 max-w-2xl mx-auto">
            Your family photos, documents, and stories matter. Share them with the community
            and ensure future generations can discover the rich history of their hometown.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/upload')}
              className="bg-white text-amber-800 hover:bg-amber-50"
            >
              <Upload className="w-5 h-5 mr-2" />
              Start Contributing
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/about')}
              className="border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;