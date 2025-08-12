import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import QRScannerScreen from '../screens/QRScannerScreen'; 


const Stack = createNativeStackNavigator();

// Controls navigation flow based on user authentication state
const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
  {isAuthenticated ? (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="QRScanner" component={QRScannerScreen} />
    </>
  ) : (
    <>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </>
  )}
</Stack.Navigator>
  );
};

export default AppNavigator;
