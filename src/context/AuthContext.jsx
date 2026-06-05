import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Auth init error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const user = await authService.login(email, password);
    setCurrentUser(user);
    return user;
  };

  const register = async (name, email, phone, password) => {
    const user = await authService.register(name, email, phone, password);
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const updateProfile = async (updates) => {
    const updatedUser = await authService.updateProfile(updates);
    setCurrentUser(updatedUser);
    return updatedUser;
  };

  const addAddress = async (address) => {
    const updatedUser = await authService.addAddress(address);
    setCurrentUser(updatedUser);
    return updatedUser;
  };

  const removeAddress = async (addressId) => {
    const updatedUser = await authService.removeAddress(addressId);
    setCurrentUser(updatedUser);
    return updatedUser;
  };

  const updateSettings = async (settings) => {
    const updatedUser = await authService.updateSettings(settings);
    setCurrentUser(updatedUser);
    return updatedUser;
  };

  const updateLoyaltyPoints = async (points, type, description) => {
    const updatedUser = await authService.updateLoyaltyPoints(points, type, description);
    setCurrentUser(updatedUser);
    return updatedUser;
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    addAddress,
    removeAddress,
    updateSettings,
    updateLoyaltyPoints
  };

  return (
    <AuthContext.Provider value={value}>
      {/* We can render children immediately, but if we have protected routes, they might flicker. 
          For now, rendering children immediately or after loading is fine. */}
      {children}
    </AuthContext.Provider>
  );
};
