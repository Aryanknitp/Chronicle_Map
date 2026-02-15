import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Map, Clock, Upload, Heart, User } from 'lucide-react';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Hide on auth pages
  const hiddenPages = ['/login', '/register'];
  if (hiddenPages.includes(location.pathname)) {
    return null;
  }

  const navItems = [
    { icon: Map, label: 'Map', path: '/map' },
    { icon: Clock, label: 'Timeline', path: '/timeline' },
    { icon: Upload, label: 'Upload', path: '/upload', emphasized: true },
    { icon: Heart, label: 'Saved', path: '/saved', requiresAuth: true },
    { icon: User, label: 'Profile', path: '/profile', requiresAuth: true },
  ];

  const handleNavigation = (item) => {
    if (item.requiresAuth && !isAuthenticated) {
      navigate('/login');
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path) => {
    if (path === '/profile') {
      return location.pathname.startsWith('/profile');
    }
    return location.pathname === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item)}
              className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all ${
                item.emphasized
                  ? 'relative'
                  : active
                  ? 'text-amber-700'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {item.emphasized ? (
                <div className="absolute -top-6 flex items-center justify-center w-14 h-14 bg-amber-700 hover:bg-amber-800 rounded-full shadow-lg transition-all">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              ) : (
                <>
                  <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
              {item.emphasized && (
                <span className="text-xs font-medium text-amber-700 mt-8">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;