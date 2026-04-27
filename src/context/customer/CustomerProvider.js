import React, { useMemo, useState } from 'react';
import { CustomerContext } from './CustomerContext';
import { createEmptyCustomerForm } from '../../services/customer/customerTransformers';

export function CustomerProvider({ children }) {
  const [listFilters, setListFilters] = useState({
    nombre: '',
    identificacion: '',
  });
  const [customerDraft, setCustomerDraft] = useState(createEmptyCustomerForm());

  const resetListFilters = () => setListFilters({
    nombre: '',
    identificacion: '',
  });

  const resetCustomerDraft = () => setCustomerDraft(createEmptyCustomerForm());

  const value = useMemo(
    () => ({
      listFilters,
      setListFilters,
      resetListFilters,
      customerDraft,
      setCustomerDraft,
      resetCustomerDraft,
    }),
    [customerDraft, listFilters]
  );

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}
