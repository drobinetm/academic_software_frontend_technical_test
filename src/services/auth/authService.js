import { apiClient } from '../api/client';

export const loginRequest = async (payload) => {
  const response = await apiClient.post('api/Authenticate/login', payload);
  return response.data;
};

export const registerRequest = async (payload) => {
  const response = await apiClient.post('api/Authenticate/register', payload);
  return response.data;
};

export const logoutRequest = async () => {
  const response = await apiClient.post('api/Authenticate/logout');
  return response.data;
};
