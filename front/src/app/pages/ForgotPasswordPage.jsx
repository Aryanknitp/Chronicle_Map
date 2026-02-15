import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin, Loader2, Clock, ArrowLeft, Mail } from 'lucide-react';
import { toast } from 'sonner';
import AuthLayout from '../layouts/AuthLayout';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      toast.success('Password reset instructions sent to your email');
    }, 1500);
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
              Reset your password
            </p>
          </div>

          {/* Forgot Password Card */}
          <Card className="border-stone-300 shadow-lg">
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>
                {submitted 
                  ? "Check your email for password reset instructions"
                  : "Enter your email address and we'll send you instructions to reset your password"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-stone-600 mb-6">
                    If an account exists with <strong>{email}</strong>, you will receive password reset instructions shortly.
                  </p>
                  <p className="text-sm text-stone-500">
                    Didn't receive an email? Check your spam folder or try again.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
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
                  <Button 
                    type="submit" 
                    className="w-full bg-amber-700 hover:bg-amber-800" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-stone-600 w-full">
                <Link 
                  to="/login" 
                  className="text-[#1e5a8f] hover:underline inline-flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Login
                </Link>
              </div>
              {submitted && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                >
                  Try Different Email
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Demo Note */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800 text-center">
              <strong>Demo Note:</strong> This is a frontend prototype. Password reset functionality will be implemented with the backend API.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;