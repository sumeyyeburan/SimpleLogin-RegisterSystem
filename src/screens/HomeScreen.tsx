import React, { useContext , useEffect , useState} from 'react';
import { View, Text } from 'react-native';
import Button from '../styles/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/HomeScreen.styles'; 
import { decodeBase64 } from '../utils/base64';
import { Alert } from 'react-native';

const motivationalMessages = [
  "Keep pushing forward!",
  "Believe in yourself!",
  "Today is a great day!",
  "Success is near!",
  "You're doing amazing!",
  "You're beautiful, brilliant, and built for greatness.",
  "Shine bright. The world needs your light.",
];

const HomeScreen = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { logoutWithReason } = useContext(AuthContext);

  const [message, setMessage] = useState('');

  // Periodically check token expiration every 30 seconds
  useEffect(() => {
  const interval = setInterval(async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(decodeBase64(payload));

      // If token expired, log out user with reason
      if (decoded.exp * 1000 < Date.now()) {
        logoutWithReason?.("Your session has expired. Please log in again.");
      }
    }
  }, 30000);

  // Cleanup interval on component unmount
  return () => clearInterval(interval);
}, []);

useEffect(() => {
    const randomMsg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setMessage(randomMsg);
  }, []);

 // Manual logout handler
  const handleLogout = async () => {
  await AsyncStorage.removeItem('token'); // Remove token from storage
  setIsAuthenticated(false); // Update auth state
  Alert.alert('Logged Out', 'You have successfully logged out.'); // Notify user
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>{message}</Text>
      
      <Button 
      style={styles.button}
      title="Log Out" 
      onPress={handleLogout} 
      />
    </View>
  );
}; 

export default HomeScreen;