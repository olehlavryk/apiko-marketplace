import React from 'react';
import c from './../../App.module.scss';
import { Link } from 'react-router-dom';
import s from './Header.module.scss'
import { Icon } from '../Icons/Icon';
import { routes } from '../../scenes/routes';

export const Header = () => {

  return(
    <header className={s.header}>
      <div className={c.container}>
        <div className={s.left}>
          <Icon name='logo' />
        </div>
        <div className={s.right}>
          <Link to={routes.login}>Login</Link>
        </div>
      </div>
    </header>
  )
}
