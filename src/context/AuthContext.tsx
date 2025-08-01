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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logoutWithReason = async (reason: string) => {
    await AsyncStorage.removeItem('token');
    setIsAuthenticated(false);
    Alert.alert('Session Expired', reason);
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const payload = token.split('.')[1];
          const decoded = JSON.parse(decodeBase64(payload));
          const isValid = decoded.exp * 1000 > Date.now();

          if (isValid) {
            setIsAuthenticated(true);
          } else {
            await AsyncStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        } catch {
          await AsyncStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
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
