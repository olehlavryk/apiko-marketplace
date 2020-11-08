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
  home = '/apiko-marketplace',

  home: `${home}/`,
  auth: `${home}/auth`,
  login: `${home}/auth/login`,
  register: `${home}/auth/register`,
  restore: `${home}/auth/restore`,
  viewerProfile: `${home}/viewer/profile`,
  productsSaved: `${home}/products/saved`,
  product: `${home}/products/:productId`,
  productAdd: `${home}/product/add`,
  user: `${home}/users/:userId/products`,
  inbox: `${home}/inbox/:chatId`,
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
