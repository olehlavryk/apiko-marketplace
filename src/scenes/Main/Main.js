import React from 'react';
import { Route } from 'react-router-dom';
import Switch from 'react-router/modules/Switch';
import s from './Main.modules.scss';
import { Header } from '../../components/Header/Header';
import { routes } from '../routes';
import { Home } from '../Home/Home';

export const Main = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route path={routes.products} component={Home} />
      </Switch>
    </>
  );
};
