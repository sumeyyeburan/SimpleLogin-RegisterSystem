import React, { useContext, useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import Button from "../styles/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { styles } from "../styles/HomeScreen.styles";
import { decodeBase64 } from "../utils/base64";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type AuthenticatedStackParamList = {
  Home: undefined;
  QRScanner: undefined;
};


const HomeScreen = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { logoutWithReason } = useContext(AuthContext);

  const navigation = useNavigation<NativeStackNavigationProp<AuthenticatedStackParamList>>();


  // Periodically check token expiration every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const payload = token.split(".")[1];
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

  // Manual logout handler
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token"); // Remove token from storage
    setIsAuthenticated(false); // Update auth state
    Alert.alert("Logged Out", "You have successfully logged out."); // Notify user
  };

  // return (
  //    <View style={styles.container}>
   
  //   <View>
  //     <Text style={styles.title}>Welcome!</Text>

  //     <Button
  //       style={styles.button}
  //       title="QR Tara"
  //       onPress={() => navigation.navigate("QRScanner")}
  //     />
  //   </View>

  //   <Button
  //     style={styles.buttonLogout}
  //     title="Log Out"
  //     onPress={handleLogout}
  //   />
  // </View>
  // );
  return (
  <View style={styles.container}>
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.title}>Welcome!</Text>
      <Button
        style={styles.button}
        title="QR Tara"
        onPress={() => navigation.navigate("QRScanner")}
      />
    </View>

    <Button
      style={styles.buttonLogout}
      title="Log Out"
      onPress={handleLogout}
    />
  </View>
);

};

export default HomeScreen;
