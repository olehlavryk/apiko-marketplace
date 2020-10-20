import React from 'react';
import { Switch, Route } from 'react-router-dom';
import s from './Main.module.scss';
import { Header } from '../../components/Header/Header';
import { routes } from '../routes';
import { Home } from '../Home/Home';
import { ProductView } from '../ProductView/ProductView';

export const Main = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route path={routes.product} component={ProductView} />
      </Switch>
    </>
  );
};