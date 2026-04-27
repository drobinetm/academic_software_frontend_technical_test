import axios from 'axios';
import { AUTH_UNAUTHORIZED_EVENT } from '../../constants/storage';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let authToken = '';

export const setApiToken = (token) => {
  authToken = token || '';
};

apiClient.interceptors.request.use((config) => {
  const nextConfig = { ...config };

  if (authToken) {
    nextConfig.headers = {
      ...nextConfig.headers,
      Authorization: `Bearer ${authToken}`,
    };
  }

  return nextConfig;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
    }

    return Promise.reject(error);
  }
);

export { apiClient };
