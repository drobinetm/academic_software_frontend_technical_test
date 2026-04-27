import { apiClient } from '../api/client';

export const getInterestsRequest = async () => {
  const response = await apiClient.get('api/Intereses/Listado');
  return response.data || [];
};
