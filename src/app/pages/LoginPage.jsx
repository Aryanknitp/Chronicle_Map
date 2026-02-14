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

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success('Welcome back!');
        navigate('/');
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen p-4">
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
              Preserving local history through community stories
            </p>
          </div>

          {/* Login Card */}
          <Card className="border-stone-300 shadow-lg">
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your account to continue contributing to our collective memory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-stone-600">
                <Link to="/forgot-password" className="text-[#1e5a8f] hover:underline">
                  Forgot your password?
                </Link>
              </div>
              <div className="text-sm text-center text-stone-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#1e5a8f] hover:underline font-semibold">
                  Sign Up
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Demo Note */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800 text-center">
              <strong>Demo Note:</strong> This is a frontend prototype. Authentication functionality will be implemented with the backend API.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;