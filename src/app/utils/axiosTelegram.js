import axios from 'axios';
const BOT_TOKEN = process.env.TELEGRAM_TOKEN

const axiosInstance = axios.create({
  baseURL: `https://api.telegram.org/bot${BOT_TOKEN}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Manejo de errores global, como redirigir si el token expira
    if (error.response && error.response.status === 401) {
      console.log('Error telegram response');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
