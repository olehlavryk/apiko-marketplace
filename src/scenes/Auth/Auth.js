import React from 'react';
import { Header } from '../../components/Header/Header';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../routes';

export const Auth = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path={routes.login} component={Login} />
        <Route path={routes.register} component={Register} />
      </Switch>
    </>
  );
}
