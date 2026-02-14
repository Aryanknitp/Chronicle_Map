import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { User, MapPin, Calendar, Award, Heart, Upload, Settings as SettingsIcon, CheckCircle, Clock, XCircle } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import MediaCard from '../components/MediaCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, isAuthenticated, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // If not authenticated, redirect to login
  if (!isAuthenticated && !id) {
    navigate('/login');
    return null;
  }

  // Mock user data - in production, fetch based on id or use currentUser
  const user = {
    id: id ? parseInt(id) : currentUser?.id || 1,
    name: currentUser?.name || 'Sarah Johnson',
    username: '@sarahjhistory',
    email: currentUser?.email || 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Local historian and preservationist passionate about keeping our community heritage alive.',
    joinDate: '2022-03-15',
    location: 'Downtown District',
    role: currentUser?.role || 'contributor',
    stats: {
      contributions: 127,
      verified: 45,
      favorites: 89,
      collections: 12,
    },
  };

  const isOwnProfile = !id || (currentUser && user.id === currentUser.id);

  // Mock uploads with status
  const myUploads = [
    {
      id: 1,
      title: 'Historic City Hall',
      type: 'photo',
      year: 1920,
      thumbnail: 'https://images.unsplash.com/photo-1760060776501-e3d2fa5d7332?w=400',
      location: 'Downtown',
      status: 'approved',
      uploadDate: '2024-01-10',
    },
    {
      id: 2,
      title: 'Market Street 1955',
      type: 'photo',
      year: 1955,
      thumbnail: 'https://images.unsplash.com/photo-1762436933065-fe6d7f51d4f3?w=400',
      location: 'Market District',
      status: 'approved',
      uploadDate: '2024-01-15',
    },
    {
      id: 3,
      title: 'Old Train Station',
      type: 'photo',
      year: 1945,
      thumbnail: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400',
      location: 'Railway District',
      status: 'pending',
      uploadDate: '2024-02-01',
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="bg-stone-50 min-h-screen">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-amber-100 to-stone-100 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
                      {user.name}
                    </h1>
                    <p className="text-lg text-stone-600 mb-1">{user.username}</p>
                  </div>
                  {isOwnProfile && (
                    <Badge variant="outline" className="text-amber-700 border-amber-700">
                      {user.role}
                    </Badge>
                  )}
                </div>
                <p className="text-stone-600 mb-4">{user.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm text-stone-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-amber-700" />
                    {user.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-amber-700" />
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Upload className="w-5 h-5 text-amber-700" />
                  </div>
                  <p className="text-2xl font-bold text-stone-900">{user.stats.contributions}</p>
                  <p className="text-sm text-stone-600">Contributions</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="w-5 h-5 text-green-700" />
                  </div>
                  <p className="text-2xl font-bold text-stone-900">{user.stats.verified}</p>
                  <p className="text-sm text-stone-600">Verified</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="w-5 h-5 text-red-700" />
                  </div>
                  <p className="text-2xl font-bold text-stone-900">{user.stats.favorites}</p>
                  <p className="text-sm text-stone-600">Favorites</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <User className="w-5 h-5 text-blue-700" />
                  </div>
                  <p className="text-2xl font-bold text-stone-900">{user.stats.collections}</p>
                  <p className="text-sm text-stone-600">Collections</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Tabs defaultValue="uploads">
            <TabsList>
              <TabsTrigger value="uploads">
                <Upload className="w-4 h-4 mr-2" />
                My Uploads
              </TabsTrigger>
              <TabsTrigger value="saved">
                <Heart className="w-4 h-4 mr-2" />
                Saved Items
              </TabsTrigger>
              {isOwnProfile && (
                <TabsTrigger value="settings">
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Settings
                </TabsTrigger>
              )}
            </TabsList>

            {/* My Uploads Tab */}
            <TabsContent value="uploads" className="mt-6">
              {myUploads.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Upload className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-stone-900 mb-2">
                      No uploads yet
                    </h3>
                    <p className="text-stone-600 mb-4">
                      Share your first piece of local history
                    </p>
                    <Button onClick={() => navigate('/upload')}>Upload Now</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myUploads.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-48 object-cover cursor-pointer"
                          onClick={() => navigate(`/location/${item.id}`)}
                        />
                        <div className="absolute top-2 right-2">
                          {getStatusBadge(item.status)}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-stone-900 mb-1 cursor-pointer hover:text-amber-700" onClick={() => navigate(`/location/${item.id}`)}>
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-stone-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{item.year}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                        <p className="text-xs text-stone-500 mt-2">
                          Uploaded {new Date(item.uploadDate).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Saved Items Tab */}
            <TabsContent value="saved" className="mt-6">
              <Card className="text-center py-12">
                <CardContent>
                  <Heart className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">
                    View all saved items
                  </h3>
                  <p className="text-stone-600 mb-4">
                    See your complete collection of saved locations and media
                  </p>
                  <Button onClick={() => navigate('/saved')}>Go to Saved</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            {isOwnProfile && (
              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Profile Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-stone-900">Profile Information</h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue={user.name} />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue={user.email} disabled />
                          <p className="text-xs text-stone-500 mt-1">Contact support to change your email</p>
                        </div>
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Input id="bio" defaultValue={user.bio} />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" defaultValue={user.location} />
                        </div>
                        <Button className="bg-amber-700 hover:bg-amber-800">Save Changes</Button>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="font-semibold text-stone-900">Change Password</h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button variant="outline">Update Password</Button>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="font-semibold text-red-600">Danger Zone</h3>
                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                        <div>
                          <p className="font-medium text-stone-900">Logout</p>
                          <p className="text-sm text-stone-600">Sign out of your account</p>
                        </div>
                        <Button variant="destructive" onClick={handleLogout}>
                          Logout
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;