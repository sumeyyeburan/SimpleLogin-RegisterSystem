import React, { useState, useContext } from 'react';
import { View, Text, Alert } from 'react-native';
import Input from '../styles/components/Input';
import Button from '../styles/components/Button';
import apiClient from '../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/AuthScreen.styles';

const LoginScreen = ({ navigation }: any) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);

  // Handles login logic when user presses the login button
  const handleLogin = async () => {
    // Basic input validation
    if (!identifier  || !password) {
      Alert.alert('Error', 'Please enter your email or username and password.');
      return;
    }

     // Is Email? Check with Regex
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

  // API Request Body
    const requestBody = {
      email: isEmail ? identifier : null,
      userName: !isEmail ? identifier : null,
      password,
    };

    setLoading(true);

    try {
      // Send login request to backend
      const response = await apiClient.post('/Auth/login', requestBody);
      const token = response.data.token;

      // Save token locally for authentication persistence
      await AsyncStorage.setItem('token', token);

      // Update global authentication state
      setIsAuthenticated(true);
    } 
    catch (error: any) {
      console.error(error.response?.data || error);

      // Default error message for user feedback
      let userMessage = 'Something went wrong. Please try again.';

      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message?.toLowerCase();

        // Default error message for user feedback
      if (status === 401 || message?.includes ('invalid credentials') || message?.includes('wrong password')) {
        userMessage = 'Incorrect username , email or password.';
      } else if (status === 400) {
        userMessage = 'Please fill in all fields correctly.';
      } else if (message) {
        // Show backend-provided error message if available
        userMessage = message;
      }
    }
    Alert.alert('Login Error', userMessage);
    }
    finally {
      setLoading(false);  
    }     
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN SYSTEM</Text>
      
      <Input 
      placeholder="Email or Username" 
      value={identifier} 
      onChangeText={setIdentifier} 
      autoCapitalize="none"
      />
      <Input 
      placeholder="Password" 
      value={password} 
      onChangeText={setPassword} 
      secureTextEntry 
      />
      <Button 
      title={loading ? '"Please wait...' : 'Login'} onPress={handleLogin} 
      disabled={loading} 
      />
      <Text 
      style={styles.AuthText} 
      onPress={() => navigation.navigate('Register')}>
        Don't you have an account?
        {"   "}
        <Text style={{ color: '#34469dff', textDecorationLine: 'underline' }}>Sign up
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
