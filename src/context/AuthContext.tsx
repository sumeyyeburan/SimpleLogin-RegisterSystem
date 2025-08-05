import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeBase64 } from '../utils/base64';
import { Alert } from 'react-native'; 

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  logoutWithReason?: (reason: string) => void; 
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

// AuthProvider component to provide authentication state and handlers to its children
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Logs out the user and shows an alert with the reason for logout
  const logoutWithReason = async (reason: string) => {
    await AsyncStorage.removeItem('token');  // Remove token from storage
    setIsAuthenticated(false); // Update auth state
    Alert.alert('Session Expired', reason); // Show alert to user
  };

  useEffect(() => {
     // Check token validity on component mount
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const payload = token.split('.')[1]; // Get JWT payload
          const decoded = JSON.parse(decodeBase64(payload)); // Decode base64 payload
          const isValid = decoded.exp * 1000 > Date.now(); // Check expiration

          if (isValid) {
            setIsAuthenticated(true); // Token valid, set authenticated
          } else {
            await AsyncStorage.removeItem('token'); // Remove expired token
            setIsAuthenticated(false);
          }
        } catch {
          await AsyncStorage.removeItem('token'); // Remove corrupted token
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false); // No token found, user not authenticated
      }
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logoutWithReason }}>
      {children}
    </AuthContext.Provider>
  );
};
