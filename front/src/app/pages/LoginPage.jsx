import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { MapPin, Loader2, Clock } from "lucide-react";
import { toast } from "sonner";
import AuthLayout from "../layouts/AuthLayout";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast.success("Welcome back!");
        navigate("/");
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-2">
              <div className="relative">
                <div className="w-12 h-12 bg-[#2c5f4f] rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#f5f1e8]" />
                </div>
                <Clock className="w-4 h-4 text-amber-600 absolute -bottom-0.5 -right-0.5" />
              </div>
              <span className="text-2xl font-serif font-bold text-stone-800">
                ChronicleMap
              </span>
            </Link>
            <p className="text-stone-600 mt-2">
              Preserving local history through community stories
            </p>
          </div>

          <Card className="border-stone-300 shadow-lg">
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Sign in to continue
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="User email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <Button className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-sm text-center text-stone-600">
              Don’t have an account?{" "}
              <Link to="/register" className="font-semibold text-blue-600">
                Sign Up
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
