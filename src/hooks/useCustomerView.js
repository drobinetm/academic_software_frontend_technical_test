import { useContext } from 'react';
import { CustomerContext } from '../context/customer/CustomerContext';

export const useCustomerView = () => useContext(CustomerContext);
