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
  home: `/apiko-marketplace/`,
  auth: `/apiko-marketplace/auth`,
  login: `/apiko-marketplace/auth/login`,
  register: `/apiko-marketplace/auth/register`,
  restore: `/apiko-marketplace/auth/restore`,
  viewerProfile: `/apiko-marketplace/viewer/profile`,
  productsSaved: `/apiko-marketplace/products/saved`,
  product: `/apiko-marketplace/products/:productId`,
  productAdd: `/apiko-marketplace/product/add`,
  user: `/apiko-marketplace/users/:userId/products`,
  inbox: `/apiko-marketplace/inbox/:chatId`,
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

export const ProtectedRoute = observer(
  ({ component: Component, ...props }) => {
    const store = useStore();

    return (
      <Route
        {...props}
        render={(...renderProps) =>
          !store.auth.isLoggedIn ? (
            <Redirect to={routes.login} />
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
