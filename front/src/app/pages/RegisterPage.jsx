import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox"; // Assuming you have this
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { MapPin, Loader2, Clock, Eye, EyeOff } from "lucide-react"; // Import Eye icons
import { toast } from "sonner";
import AuthLayout from "../layouts/AuthLayout";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 1. ADD STATES FOR VISIBILITY
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false); // 2. TERMS STATE
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error("You must agree to the Terms and Conditions");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const result = await register(
        formData.name,
        formData.email,
        formData.password
      );

      if (result.success) {
        toast.success("Account created successfully! 🎉");
        navigate("/");
      } else {
        toast.error(result.error || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen p-4 py-8">
        <div className="w-full max-w-md">
          {/* Header Section (Same as Login) */}
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

          <Card className="border-stone-300 shadow-lg">
            <CardHeader>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>
                Start preserving and sharing history
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    name="name"
                    placeholder="Jane Do"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                {/* PASSWORD FIELD WITH TOGGLE */}
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* CONFIRM PASSWORD FIELD WITH TOGGLE */}
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-700"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* 2. TERMS AND CONDITIONS CHECKBOX */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={setAgreedToTerms}
                  />
                  <Label htmlFor="terms" className="text-sm font-normal text-stone-600">
                    I agree to the <Link to="/terms" className="text-amber-700 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-amber-700 hover:underline">Privacy Policy</Link>
                  </Label>
                </div>

                <Button className="w-full bg-amber-700 hover:bg-amber-800" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex justify-center text-sm text-stone-600">
              Already have an account?{" "}
              {/* 3. CONSISTENT LINK COLOR */}
              <Link to="/login" className="font-semibold text-[#1e5a8f] hover:underline ml-1">
                Sign In
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;