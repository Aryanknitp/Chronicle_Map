import { useNavigate } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Settings as SettingsIcon, ArrowLeft, Bell, Lock, Globe, Palette, Database } from 'lucide-react';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-3">
            <SettingsIcon className="w-8 h-8 text-amber-700" />
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">Settings</h1>
          </div>
          <p className="text-stone-600 mt-2">
            Manage your account preferences and application settings
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-amber-700" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-stone-500">Receive updates about your contributions</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="contribution-approved" className="font-medium">Contribution Approved</Label>
                  <p className="text-sm text-stone-500">Get notified when your uploads are approved</p>
                </div>
                <Switch id="contribution-approved" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="new-collections" className="font-medium">New Collections</Label>
                  <p className="text-sm text-stone-500">Updates about new curated collections</p>
                </div>
                <Switch id="new-collections" />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2 text-amber-700" />
                Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="public-profile" className="font-medium">Public Profile</Label>
                  <p className="text-sm text-stone-500">Allow others to view your profile</p>
                </div>
                <Switch id="public-profile" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-contributions" className="font-medium">Show Contribution Count</Label>
                  <p className="text-sm text-stone-500">Display your total contributions publicly</p>
                </div>
                <Switch id="show-contributions" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Display */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2 text-amber-700" />
                Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="high-contrast" className="font-medium">High Contrast Mode</Label>
                  <p className="text-sm text-stone-500">Increase text and UI contrast</p>
                </div>
                <Switch id="high-contrast" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reduced-motion" className="font-medium">Reduced Motion</Label>
                  <p className="text-sm text-stone-500">Minimize animations and transitions</p>
                </div>
                <Switch id="reduced-motion" />
              </div>
            </CardContent>
          </Card>

          {/* Data & Storage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2 text-amber-700" />
                Data & Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Download Your Data</Label>
                  <p className="text-sm text-stone-500">Export all your contributions and data</p>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Clear Cache</Label>
                  <p className="text-sm text-stone-500">Remove locally stored data</p>
                </div>
                <Button variant="outline" size="sm">Clear</Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-amber-700" />
                Account Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Language</Label>
                  <p className="text-sm text-stone-500">English (US)</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Time Zone</Label>
                  <p className="text-sm text-stone-500">Automatically detected</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Demo Note */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800 text-center">
            <strong>Demo Note:</strong> Settings functionality will be fully implemented with the backend API.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;