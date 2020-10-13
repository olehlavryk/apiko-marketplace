import React from 'react';
import { Link } from 'react-router-dom';
import s from './Header.module.scss'
import { Icon } from '../Icons/Icon';
import { routes } from '../../scenes/routes';
import './../../App.css';

export const Header = () => {

  return(
    <header className={s.header}>
      <div className="container">
        <div className={s.left}>
          <Link to={routes.home}>
            <Icon name='logo' />
          </Link>
        </div>
        <div className={s.right}>
          <Link to={routes.home} className={s.primary_link}>Sell</Link>
          <Link to={routes.login} className={s.outline_link}>Login</Link>
          <Link to={routes.home}>
            <Icon name="like" />
          </Link>
        </div>
      </div>
    </header>
  )
}
