import { API_BASE_URL } from '@lib/constant';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
