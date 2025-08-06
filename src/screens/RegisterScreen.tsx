import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import Input from "../styles/components/Input";
import Button from "../styles/components/Button";
import apiClient from "../api/apiClient";
import { validatePassword, validateEmail } from "../utils/validation";
import {styles} from '../styles/AuthScreen.styles'

const RegisterScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handles user registration logic on form submission
  const handleRegister = async () => {
    // Validate all required fields are filled
    if (!userName || !email || !password) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    if (!userName || userName.length < 3) {
      Alert.alert("Error", "Username must be at least 3 characters long.");
      return;
    }
    
    // Validate email format
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Validate password complexity
    if (!validatePassword(password)) {
      Alert.alert(
        "Password Error",
        "Your password needs to be at least 8 characters and include a capital letter, a number, and a special symbol."
      );
      return;
    }

    setLoading(true);

    try {
      // Send registration request to backend API
      await apiClient.post("/Auth/register", {
        userName,
        email,
        password,
      });

      // Inform user of successful registration
      Alert.alert("Success", "Your account was created successfully! You can now log in.");

      // Navigate back to login screen
      navigation.goBack();
    } 
    catch (error: any) {
      let message = "Something went wrong. Please try again.";

      // Extract meaningful error message from backend if available
      if (error?.response?.data) {
      const data = error.response.data;

      if (typeof data.message === "string") {
        message = data.message;
      } else if (typeof data === "string") {
        message = data; // Some backends return plain string messages
      }
    }
      console.error("Registration Error:", message);
      Alert.alert("Registration Error", message); 
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CREATE ACCOUNT</Text>
      <Input
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="none"
      />
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={loading ? "Please wait..." : "Sign Up"}
        onPress={handleRegister}
        disabled={loading}
      />
      <Text style={styles.AuthText}  onPress={()   =>navigation.goBack()}>
        Do you already have an account? 
        {"   "}  
        <Text style={{ color: '#34469dff', textDecorationLine: 'underline' }}>
          Login</Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;
