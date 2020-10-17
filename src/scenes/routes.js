import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Auth } from './Auth/Auth';
import { Footer } from '../components/Footer/Footer';

export const routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  reset: '/auth/reset',
  profile: '/user/profile',
};

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={routes.home}
          component={() => <div>Home scene</div>}
        />
        <Route path={routes.auth} component={Auth} />
      </Switch>
      <Footer>Copyright © 2017. Privacy Policy.</Footer>
    </BrowserRouter>
  );
}
