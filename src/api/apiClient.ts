import axios from 'axios'; // Library used to make HTTP requests like GET, POST, PUT, DELETE, etc.
import AsyncStorage from '@react-native-async-storage/async-storage'; // Used in React Native to store small data on device (e.g., token, user info). Here, JWT token is stored.

const apiClient = axios.create({
  baseURL: 'https://00ae62502df0.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token in header
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export default apiClient;
// Exporting this apiClient object so other files can import and use it.