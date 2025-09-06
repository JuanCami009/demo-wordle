import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
});

export { axiosInstance };
