import axios from 'axios'; // HTTP istekleri yapmak için kullanılan bir kütüphane. GET, POST, PUT, DELETE vs.
import AsyncStorage from '@react-native-async-storage/async-storage'; // React Native’de cihazda küçük verileri (örneğin token, kullanıcı bilgisi) saklamak için kullanılır. Burada JWT token saklanıyor.

const apiClient = axios.create({
  baseURL: 'http://10.0.2.2:5246/api',
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
// Bu apiClient objesini dışarıya açıyoruz, yani diğer dosyalar bunu import edip kullanabilir.