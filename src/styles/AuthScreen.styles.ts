import { StyleSheet } from 'react-native';
import { colors } from './colors';   // Importing predefined color palette

export const styles = StyleSheet.create({
  container: { 
    backgroundColor: colors.background,
    flex: 1, 
    justifyContent: 'center', 
    paddingHorizontal: 17,
  },
  
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 30,
    color: colors.primary,
  },
  
  AuthText: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 17,
    color: colors.accent,
  },
});
