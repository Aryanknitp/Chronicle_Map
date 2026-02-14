import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { MapProvider } from './context/MapContext';
import { UploadProvider } from './context/UploadContext';
import { Toaster } from './components/ui/sonner';

// Pages
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import LocationDetailPage from './pages/LocationDetailPage';
import TimelinePage from './pages/TimelinePage';
import UploadPage from './pages/UploadPage';
import CollectionsPage from './pages/CollectionsPage';
import SearchPage from './pages/SearchPage';
import SavedPage from './pages/SavedPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import GuidelinesPage from './pages/GuidelinesPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MapProvider>
          <UploadProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/location/:id" element={<LocationDetailPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/collections/:id" element={<CollectionsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/guidelines" element={<GuidelinesPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<PrivacyPage />} />
              <Route path="/contact" element={<ContactPage />} />
             
            </Routes>
            <Toaster />
          </UploadProvider>
        </MapProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}