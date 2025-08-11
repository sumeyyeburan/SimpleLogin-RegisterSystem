// import { StyleSheet } from 'react-native';
// import { colors } from '../styles/colors';

// export const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.background,
//     flex: 1,
//     justifyContent: 'space-between', // Üst ve alt buton arası boşluğu otomatik ayarlar
//     alignItems: 'center',
//     paddingTop: 80, 
//     paddingBottom: 50, // Alt tarafta biraz boşluk bırakır
//   },
//   title: {
//     fontSize: 60,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     marginTop:50,
//     color: '#d67a9dff',  
//   },
//   button: {
//     backgroundColor: colors.accent,
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     width: 180,
//     padding: 20,
//     marginTop: 300,   // QR butonunun başlıktan boşluğu
//      alignSelf: 'center',
//   },
//   buttonLogout: {
//     backgroundColor: colors.secondary,
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     width: 120,
//     padding: 15,
//     marginBottom: 0, // Alt boşluğu container paddingBottom kontrol ediyor
//   },
// });

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
    borderRadius: 25, // Daha yuvarlak
    alignItems: 'center',
    width: 200,
    marginTop: 200,
    shadowColor: '#000', // Gölge efekti
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
