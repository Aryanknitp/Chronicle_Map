import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { AuthProvider } from "./context/AuthContext";
import { MapProvider } from "./context/MapContext";
import { UploadProvider } from "./context/UploadContext";
import { Toaster } from "./components/ui/sonner";

// =============================
// Lazy-loaded Pages
// =============================
const HomePage = lazy(() => import("./pages/HomePage"));
const MapPage = lazy(() => import("./pages/MapPage"));
const LocationDetailPage = lazy(() => import("./pages/LocationDetailPage"));
const TimelinePage = lazy(() => import("./pages/TimelinePage"));
const UploadPage = lazy(() => import("./pages/UploadPage"));
const CollectionsPage = lazy(() => import("./pages/CollectionsPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const SavedPage = lazy(() => import("./pages/SavedPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const GuidelinesPage = lazy(() => import("./pages/GuidelinesPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

// =============================
// Loader Component
// =============================
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen text-gray-500">
    Loading...
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MapProvider>
          <UploadProvider>
            {/* Suspense wraps routes */}
            <Suspense fallback={<PageLoader />}>
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
            </Suspense>

            <Toaster />
          </UploadProvider>
        </MapProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
