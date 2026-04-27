import React from 'react';
import { createEmptyCustomerForm } from '../../services/customer/customerTransformers';

export const CustomerContext = React.createContext({
  listFilters: {
    nombre: '',
    identificacion: '',
  },
  customerDraft: createEmptyCustomerForm(),
  setListFilters: () => {},
  resetListFilters: () => {},
  setCustomerDraft: () => {},
  resetCustomerDraft: () => {},
});
