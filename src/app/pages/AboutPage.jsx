import { useNavigate } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { MapPin, Clock, Users, Heart, Shield, Award, ArrowLeft } from 'lucide-react';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="bg-stone-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-100 to-stone-100 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <MapPin className="w-12 h-12 text-amber-700" />
                <Clock className="w-6 h-6 text-amber-600 absolute -bottom-1 -right-1" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
                ChronicleMap
              </h1>
            </div>
            <p className="text-xl text-stone-700 leading-relaxed">
              A participatory local history and geospatial storytelling platform that enables communities 
              to preserve disappearing local history by uploading photos, documents, and oral histories 
              attached to real geographic locations.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Our Mission</h2>
            <p className="text-lg text-stone-700 leading-relaxed mb-4">
              ChronicleMap bridges the gap between traditional archives and modern technology, empowering 
              communities to become active custodians of their own heritage. We believe that local history 
              belongs to everyone and should be accessible, interactive, and continuously enriched by the 
              people who lived it.
            </p>
            <p className="text-lg text-stone-700 leading-relaxed">
              By combining map-first navigation with archival warmth and modern clarity, we create a digital 
              museum that feels both familiar and innovative—a place where memories are not just stored, 
              but actively shared and discovered.
            </p>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <Users className="w-10 h-10 text-amber-700 mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Community-Driven</h3>
                  <p className="text-stone-600">
                    Every contribution matters. We believe the best historians are the people who lived 
                    the history themselves.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Shield className="w-10 h-10 text-amber-700 mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Preservation First</h3>
                  <p className="text-stone-600">
                    We're committed to long-term preservation of local heritage with proper attribution 
                    and archival standards.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Heart className="w-10 h-10 text-amber-700 mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Accessible to All</h3>
                  <p className="text-stone-600">
                    History should be free and open. Our platform is designed to be inclusive and 
                    accessible to everyone.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Award className="w-10 h-10 text-amber-700 mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Quality & Accuracy</h3>
                  <p className="text-stone-600">
                    Our team of historians reviews contributions to ensure accuracy while maintaining 
                    diverse perspectives.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">How It Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Explore</h3>
                  <p className="text-stone-600">
                    Browse historical content through our interactive map, timeline view, or curated collections.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Contribute</h3>
                  <p className="text-stone-600">
                    Upload your photos, documents, audio recordings, and stories. Pin them to specific locations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Connect</h3>
                  <p className="text-stone-600">
                    Engage with others' contributions, save favorites, and build your own collections.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">Preserve</h3>
                  <p className="text-stone-600">
                    Your contributions become part of a permanent digital archive for future generations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-amber-700 rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-serif font-bold mb-4">Start Your Journey</h2>
            <p className="text-lg mb-6 opacity-90">
              Help preserve your community's history. Every story matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')}
                className="bg-white text-amber-800 hover:bg-stone-100"
              >
                Join ChronicleMap
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/map')}
                className="border-white text-white hover:bg-white/10"
              >
                Explore the Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;