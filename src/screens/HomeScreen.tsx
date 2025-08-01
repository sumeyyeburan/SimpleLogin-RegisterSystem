import React, { useContext , useEffect} from 'react';
import { View, Text } from 'react-native';
import Button from '../styles/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/HomeScreen.styles'; 
import { decodeBase64 } from '../utils/base64';
import { Alert } from 'react-native';

const HomeScreen = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { logoutWithReason } = useContext(AuthContext);


  useEffect(() => {
  const interval = setInterval(async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(decodeBase64(payload));
      if (decoded.exp * 1000 < Date.now()) {
        logoutWithReason?.("Your session has expired. Please log in again.");
      }
    }
  }, 30000);

  return () => clearInterval(interval);
}, []);

  const handleLogout = async () => {
  await AsyncStorage.removeItem('token');
  setIsAuthenticated(false);
  Alert.alert('Logged Out', 'You have successfully logged out.');
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Button 
      style={styles.button}
      title="Log Out" 
      onPress={handleLogout} 
      />
    </View>
  );
};

export default HomeScreen;
