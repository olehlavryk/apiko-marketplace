import React from 'react';
import { Header } from '../../components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import { routes } from './../routes';

export const Auth = () => {
  return(
    <>
      <Header />
      <Switch>
        <Route path={routes.login} component={() => <div>Login</div>}/>
        <Route path={routes.register} component={() => <div>Register</div>}/>
      </Switch>
    </>
  );
}
