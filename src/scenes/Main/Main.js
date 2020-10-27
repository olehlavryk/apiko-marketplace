import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import s from './Main.module.scss';
import { Header } from '../../components/Header/Header';
import { ProtectedRoute, routes } from '../routes';
import { Home } from '../Home/Home';
import { ProductView } from '../ProductView/ProductView';
import { User } from '../User/User';
import { ProductAdd } from '../ProductAdd/ProductAdd';

export const Main = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route path={routes.product} component={ProductView} />
        <Route path={routes.user} component={User} />
        <ProtectedRoute
          path={routes.productAdd}
          component={ProductAdd}
        />
      </Switch>
    </>
  );
};
