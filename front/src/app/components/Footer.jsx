import { Link } from 'react-router';
import { MapPin, Clock, Mail, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <MapPin className="w-8 h-8 text-amber-700" />
                <Clock className="w-4 h-4 text-amber-600 absolute -bottom-1 -right-1" />
              </div>
              <span className="font-serif text-xl font-bold text-stone-800">
                ChronicleMap
              </span>
            </div>
            <p className="text-stone-600 text-sm max-w-md mb-4">
              Preserving local history through community-driven geospatial storytelling.
              Every place has a story. Help us map the memories.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-amber-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-amber-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@chroniclemap.org"
                className="text-stone-500 hover:text-amber-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-stone-900 mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/map" className="text-stone-600 hover:text-amber-700 transition-colors">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link
                  to="/timeline"
                  className="text-stone-600 hover:text-amber-700 transition-colors"
                >
                  Timeline
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-stone-600 hover:text-amber-700 transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-stone-600 hover:text-amber-700 transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-stone-900 mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-stone-600 hover:text-amber-700 transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  to="/upload"
                  className="text-stone-600 hover:text-amber-700 transition-colors"
                >
                  How to Contribute
                </Link>
              </li>
              <li>
                <Link
                  to="/guidelines"
                  className="text-stone-600 hover:text-amber-700 transition-colors"
                >
                  Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-stone-600 hover:text-amber-700 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-stone-600 hover:text-amber-700 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-200 text-center">
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()} ChronicleMap. Preserving history, one story at a
            time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;