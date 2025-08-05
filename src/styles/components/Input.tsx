import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  placeholder: string; // Placeholder text shown when input is empty
}

const Input: React.FC<InputProps> = ({ placeholder, ...rest }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      placeholderTextColor="#999"
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 55,
    borderColor: '#0ca1a1ff',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#ffffffff',
  },
});

export default Input;
