import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { PrivateRoute, routes } from '../routes';

export const Auth = () => {
  return (
    <>
      <Header />
      <Switch>
        <PrivateRoute path={routes.login} component={Login} />
        <PrivateRoute path={routes.register} component={Register} />
      </Switch>
    </>
  );
}
