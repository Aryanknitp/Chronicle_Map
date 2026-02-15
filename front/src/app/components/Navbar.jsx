import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { MapPin, Clock, Map, FolderOpen, Search, Upload, Heart, User, Settings, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const mainNavItems = [
    { name: 'Explore Map', icon: Map, path: '/map' },
    { name: 'Timeline', icon: Clock, path: '/timeline' },
    { name: 'Collections', icon: FolderOpen, path: '/collections' },
    { name: 'Search', icon: Search, path: '/search' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleIconClick = (path, requiresAuth = false) => {
    if (requiresAuth && !isAuthenticated) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <MapPin className="w-8 h-8 text-amber-700 group-hover:text-amber-800 transition-colors" />
              <Clock className="w-4 h-4 text-amber-600 absolute -bottom-1 -right-1" />
            </div>
            <span className="font-serif text-2xl font-bold text-stone-800 group-hover:text-stone-900 transition-colors">
              ChronicleMap
            </span>
          </Link>

          {/* Desktop Navigation - Text Tabs */}
          <div className="hidden md:flex items-center space-x-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    active
                      ? 'bg-amber-50 text-amber-700 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions - Icon Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Upload Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleIconClick('/upload')}
              className="text-amber-700 hover:text-amber-800 hover:bg-amber-50"
              title="Upload"
            >
              <Upload className="w-5 h-5" />
            </Button>

            {isAuthenticated ? (
              <>
                {/* Saved Icon */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleIconClick('/saved', true)}
                  className={isActive('/saved') ? 'bg-stone-100' : ''}
                  title="Saved"
                >
                  <Heart className={`w-5 h-5 ${isActive('/saved') ? 'fill-current text-red-600' : 'text-stone-600'}`} />
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`rounded-full ${location.pathname.startsWith('/profile') ? 'bg-stone-100' : ''}`}
                      title="Profile"
                    >
                      <User className="w-5 h-5 text-stone-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-2">
                      <p className="text-sm font-medium text-stone-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-stone-500">{user?.email || 'user@example.com'}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(`/profile`)}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')} className="bg-amber-700 hover:bg-amber-800">
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200">
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {isAuthenticated ? (
              <div className="mt-4 pt-4 border-t border-stone-200 space-y-1">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-stone-200 space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  className="w-full bg-amber-700 hover:bg-amber-800"
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;