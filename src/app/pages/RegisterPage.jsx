import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin, Loader2, Clock } from 'lucide-react';
import { toast } from 'sonner';
import AuthLayout from '../layouts/AuthLayout';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        toast.success('Account created successfully! Welcome to ChronicleMap.');
        navigate('/');
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen p-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-2 group">
              <div className="relative">
                <div className="w-12 h-12 bg-[#2c5f4f] rounded-full flex items-center justify-center group-hover:bg-[#234a3d] transition-colors">
                  <MapPin className="w-6 h-6 text-[#f5f1e8]" />
                </div>
                <Clock className="w-4 h-4 text-amber-600 absolute -bottom-0.5 -right-0.5" />
              </div>
              <span className="text-2xl font-serif font-bold text-stone-800 group-hover:text-stone-900 transition-colors">
                ChronicleMap
              </span>
            </Link>
            <p className="text-stone-600 mt-2">
              Join our community of history keepers
            </p>
          </div>

          {/* Register Card */}
          <Card className="border-stone-300 shadow-lg">
            <CardHeader>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>
                Start preserving local history and sharing stories from your community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-stone-500">
                    Must be at least 8 characters long
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-xs text-center text-stone-600">
                By signing up, you agree to our{' '}
                <Link to="/terms" className="text-[#1e5a8f] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-[#1e5a8f] hover:underline">
                  Privacy Policy
                </Link>
              </div>
              <div className="text-sm text-center text-stone-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#1e5a8f] hover:underline font-semibold">
                  Sign In
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Demo Note */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800 text-center">
              <strong>Demo Note:</strong> This is a frontend prototype. Registration will be implemented with the backend API.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;