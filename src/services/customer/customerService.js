import { apiClient } from '../api/client';

export const getCustomersRequest = async (payload) => {
  const response = await apiClient.post('api/Cliente/Listado', payload);
  return response.data || [];
};

export const getCustomerByIdRequest = async (customerId) => {
  const response = await apiClient.get(`api/Cliente/Obtener/${customerId}`);
  return response.data;
};

export const createCustomerRequest = async (payload) => {
  const response = await apiClient.post('api/Cliente/Crear', payload, {
    timeout: 60000,
  });
  return response.data;
};

export const updateCustomerRequest = async (payload) => {
  const response = await apiClient.post('api/Cliente/Actualizar', payload, {
    timeout: 60000,
  });
  return response.data;
};

export const deleteCustomerRequest = async (customerId) => {
  const response = await apiClient.delete(`api/Cliente/Eliminar/${customerId}`);
  return response.data;
};
