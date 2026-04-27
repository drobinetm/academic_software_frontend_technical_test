import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { LoadingFallback } from '../../components/common/LoadingFallback';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { LoginPage } from '../../pages/Login/LoginPage';
import { RegisterPage } from '../../pages/Register/RegisterPage';
import { HomePage } from '../../pages/Home/HomePage';
import { CustomersPage } from '../../pages/Customers/CustomersPage';
import { CustomerFormPage } from '../../pages/CustomerForm/CustomerFormPage';
import { NotFoundPage } from '../../pages/NotFound/NotFoundPage';

export function AppRouter() {
  const { status, isAuthenticated } = useAuth();

  if (status === 'checking') {
    return <LoadingFallback fullScreen label="Cargando sesión" />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.root}>
          <Redirect to={isAuthenticated ? ROUTES.home : ROUTES.login} />
        </Route>

        <PublicRoute exact path={ROUTES.login} component={LoginPage} />
        <PublicRoute exact path={ROUTES.register} component={RegisterPage} />

        <PrivateRoute exact path={ROUTES.home} component={HomePage} />
        <PrivateRoute exact path={ROUTES.customers} component={CustomersPage} />
        <PrivateRoute exact path={ROUTES.customerCreate} component={CustomerFormPage} />
        <PrivateRoute exact path={ROUTES.customerEditPattern} component={CustomerFormPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
