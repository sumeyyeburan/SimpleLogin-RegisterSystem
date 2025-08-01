import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../src/context/AuthContext';
import AppNavigator from '../src/navigation/AppNavigator';

// Main component of the app
export default function App() {
  return (
    // Wrap the app with AuthProvider to manage authentication state globally
    <AuthProvider>
       {/* NavigationContainer is required by React Navigation to manage navigation tree */}
      <NavigationContainer>
        {/* AppNavigator controls which screens to show based on authentication status */}
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
