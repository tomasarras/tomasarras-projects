import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Manejo de errores global, como redirigir si el token expira
    if (error.response && error.response.status === 401) {
      console.log('expired token');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
