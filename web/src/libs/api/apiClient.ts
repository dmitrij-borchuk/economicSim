import axios from 'axios';
import { getCurrentIdToken } from '../firebase/firebase';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getCurrentIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn('Failed to attach Firebase auth token to request:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
