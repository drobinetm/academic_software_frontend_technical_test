import React from 'react';

export const AuthContext = React.createContext({
  status: 'checking',
  isAuthenticated: false,
  user: null,
  token: '',
  userid: '',
  login: async () => {},
  register: async () => {},
  logout: () => {},
  getRememberedUsername: () => '',
  setRememberedUsername: () => {},
});
