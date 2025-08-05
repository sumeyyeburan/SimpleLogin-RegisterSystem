import { StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80, 
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#d67a9dff',  
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: 110,
    padding: 15,
    marginTop: 'auto',           
    marginBottom: 300,    
  },
  subtitle: {
  fontSize: 70,
  textAlign: 'center',
  color: colors.accent,
  marginTop: 70,  
  marginBottom: 100, 
  },

});
