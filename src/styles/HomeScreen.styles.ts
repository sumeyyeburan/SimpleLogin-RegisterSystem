import { StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#d67a9dff',
    marginBottom: 40,
    marginTop:40,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 15,
    borderRadius: 25, 
    alignItems: 'center',
    width: 200,
    marginTop: 200,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonLogout: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
