import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
/*
TouchableOpacity: Dokunma etkisi veren, buton işlevi gören React Native komponenti.

Text: Buton üzerindeki yazı için.

StyleSheet: Stil oluşturmak için.

TouchableOpacityProps: Butonun standart özellik tipleri (disabled, onPress, vb).
*/

interface ButtonProps extends TouchableOpacityProps {
  title: string;
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
