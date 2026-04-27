import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { AUTH_UNAUTHORIZED_EVENT, STORAGE_KEYS } from '../../constants/storage';
import { loginRequest, logoutRequest, registerRequest } from '../../services/auth/authService';
import { setApiToken } from '../../services/api/client';
import { readStorageJson, readStorageValue, removeStorageValue, writeStorageJson, writeStorageValue } from '../../utils/storage';
import { getApiErrorMessage } from '../../utils/api';
import { AuthContext } from './AuthContext';

const initialState = {
  status: 'checking',
  user: null,
  token: '',
  userid: '',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_SESSION':
      return {
        status: action.payload?.token ? 'authenticated' : 'unauthenticated',
        user: action.payload?.user || null,
        token: action.payload?.token || '',
        userid: action.payload?.userid || '',
      };
    case 'LOGIN_SUCCESS':
      return {
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token,
        userid: action.payload.userid,
      };
    case 'LOGOUT':
      return {
        status: 'unauthenticated',
        user: null,
        token: '',
        userid: '',
      };
    default:
      return state;
  }
};

const persistSession = (session) => {
  writeStorageJson(STORAGE_KEYS.authSession, session);
  setApiToken(session?.token || '');
};

const clearSession = () => {
  removeStorageValue(STORAGE_KEYS.authSession);
  setApiToken('');
};

const sanitizeAuthMessage = (message, fallbackMessage) => {
  if (!message) {
    return fallbackMessage;
  }

  return /cliente|guardar/i.test(message) ? fallbackMessage : message;
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const persistedSession = readStorageJson(STORAGE_KEYS.authSession);

    if (persistedSession?.token) {
      setApiToken(persistedSession.token);
      dispatch({ type: 'RESTORE_SESSION', payload: persistedSession });
      return;
    }

    dispatch({ type: 'RESTORE_SESSION', payload: null });
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearSession();
      dispatch({ type: 'LOGOUT' });
    };

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);

    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, []);

  const login = useCallback(async ({ username, password, rememberMe }) => {
    try {
      const response = await loginRequest({ username, password });
      const session = {
        token: response?.token || '',
        userid: response?.userid || '',
        user: {
          username: response?.username || username,
          expiration: response?.expiration || '',
        },
      };

      if (!session.token || !session.userid) {
        throw new Error('Login response did not include token or userid.');
      }

      persistSession(session);
      dispatch({ type: 'LOGIN_SUCCESS', payload: session });

      if (rememberMe) {
        writeStorageValue(STORAGE_KEYS.rememberedUsername, username);
      } else {
        removeStorageValue(STORAGE_KEYS.rememberedUsername);
      }

      return session;
    } catch (error) {
      const resolvedMessage = getApiErrorMessage(error, 'No se pudo iniciar sesión.');
      throw new Error(sanitizeAuthMessage(resolvedMessage, 'No fue posible autenticarse con las credenciales proporcionadas.'));
    }
  }, []);

  const register = useCallback(async (payload) => {
    try {
      return await registerRequest(payload);
    } catch (error) {
      const resolvedMessage = getApiErrorMessage(error, 'No se pudo completar el registro.');
      throw new Error(sanitizeAuthMessage(resolvedMessage, 'No fue posible completar el registro con los datos proporcionados.'));
    }
  }, []);

  const logout = useCallback(async () => {
    let logoutError = null;

    try {
      await logoutRequest();
    } catch (error) {
      const resolvedMessage = getApiErrorMessage(error, 'No se pudo cerrar la sesión.');
      logoutError = new Error(sanitizeAuthMessage(resolvedMessage, 'No fue posible cerrar la sesión correctamente.'));
    } finally {
      clearSession();
      dispatch({ type: 'LOGOUT' });
    }

    if (logoutError) {
      throw logoutError;
    }
  }, []);

  const getRememberedUsername = useCallback(() => readStorageValue(STORAGE_KEYS.rememberedUsername, ''), []);

  const setRememberedUsername = useCallback((username) => {
    if (username) {
      writeStorageValue(STORAGE_KEYS.rememberedUsername, username);
      return;
    }

    removeStorageValue(STORAGE_KEYS.rememberedUsername);
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      isAuthenticated: state.status === 'authenticated',
      login,
      register,
      logout,
      getRememberedUsername,
      setRememberedUsername,
    }),
    [getRememberedUsername, login, logout, register, setRememberedUsername, state]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
