import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';

export function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthenticated ? <Component {...routeProps} /> : <Redirect to={ROUTES.login} />
      }
    />
  );
}
