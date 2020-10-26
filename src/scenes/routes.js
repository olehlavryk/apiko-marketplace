import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import { Auth } from './Auth/Auth';
import { Footer } from '../components/Footer/Footer';
import { useStore } from '../stores/createStore';
import { Main } from './Main/Main';

export const routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  reset: '/auth/reset',
  profile: '/user/profile',
  product: '/products/:productId',
  user: '/users/:userId/products',
};

export const PrivateRoute = observer(
  ({ component: Component, ...props }) => {
    const store = useStore();

    return (
      <Route
        {...props}
        render={(...renderProps) =>
          store.auth.isLoggedIn ? (
            <Redirect to={routes.home} />
          ) : (
            <Component {...renderProps} />
          )
        }
      />
    );
  },
);

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path={routes.auth} component={Auth} />
        <Route component={Main} />
      </Switch>
      <Footer>Copyright © 2017. Privacy Policy.</Footer>
    </BrowserRouter>
  );
}
