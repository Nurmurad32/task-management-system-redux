// utils/axiosInstance.js
import axios from 'axios';
import baseAPI from '../components/api/baseAPI/baseApi';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseAPI, // Update if different
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
