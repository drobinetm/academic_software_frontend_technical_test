export const ROUTES = {
  root: '/',
  login: '/login',
  register: '/register',
  home: '/home',
  customers: '/clientes',
  customerCreate: '/clientes/nuevo',
  customerEditPattern: '/clientes/:id/editar',
};

export const getCustomerEditRoute = (id) => `/clientes/${id}/editar`;
