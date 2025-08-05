import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
/*
TouchableOpacity: A React Native component that provides touch feedback and acts as a button.

Text: Displays the text inside the button.

StyleSheet: Used for creating component-specific styles.

TouchableOpacityProps: Standard prop types for TouchableOpacity (like disabled, onPress, etc).
*/

interface ButtonProps extends TouchableOpacityProps {
  title: string; // Button label text
}

const Button: React.FC<ButtonProps> = ({ title, disabled, ...rest }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabled : null]}
      disabled={disabled}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#c480e4ff', 
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, 
  },
  disabled: {
    backgroundColor: '#A3A3A3', 
  },
  text: {
    color: '#F9FAFB', 
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});


export default Button;
