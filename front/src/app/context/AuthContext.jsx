import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/api"; // Import the service, not just the axios instance

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // 1. Initialize Auth on App Load
  // =========================================================
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      
      // If no token, stop loading and let them be a "guest"
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Token exists, verify it by fetching user profile
        const response = await authService.getCurrentUser();
        
        // Handle different backend structures (user might be in response.data or response.data.user)
        const userData = response.data.user || response.data;
        setUser(userData);
      } catch (error) {
        console.error("Session expired or invalid:", error);
        // If the token is invalid, clear it so they don't get stuck
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // =========================================================
  // 2. Login
  // =========================================================
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      console.log("Login Response:", response.data); // Debugging

      // Handle generic backend token/user keys
      const token = response.data.token || response.data.accessToken;
      const userData = response.data.user || response.data.data;

      if (!token) throw new Error("Server did not return a token");

      // SAVE TOKEN: The axios interceptor in api.js will pick this up automatically for next requests
      localStorage.setItem("token", token);
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  // =========================================================
  // 3. Register
  // =========================================================
  const register = async (name, email, password) => {
    try {
      const response = await authService.register(name, email, password);
      
      const token = response.data.token || response.data.accessToken;
      const userData = response.data.user || response.data.data;

      if (!token) throw new Error("Server did not return a token");

      localStorage.setItem("token", token);
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // =========================================================
  // 4. Logout
  // =========================================================
  const logout = () => {
    authService.logout(); // Notify backend if needed
    localStorage.removeItem("token"); // Clear token
    setUser(null); // Clear state
    // We do NOT need to redirect here; the UI will react to user being null
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user, // Derived boolean
    login,
    register,
    logout,
  };

  // Show a loading spinner while checking if the user is logged in
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-stone-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;