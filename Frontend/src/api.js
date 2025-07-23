import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL||'http://localhost:5000', // Your exact Render URL
  withCredentials: true // This is crucial
});

export default api;