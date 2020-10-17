import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import s from './Header.module.scss';
import { Icon } from '../Icons/Icon';
import { routes } from '../../scenes/routes';
import './../../App.css';
import { useStore } from '../../stores/createStore';

const UserInfo = observer(() => {
  const store = useStore();

  const [state, setState] = useState({ open: false });

  const toggleClick = () => {
    setState({ open: !state.open });
  };

  return (
    <div
      className={s.user_info}
      onClick={(e) => toggleClick(e)}
    >

      {state.open && (
        <div className={s.user_info_dropdown} onClick={(e) => e.stopPropagation()}>
          <div className={s.user_details_box}>
            <div className={s.user_avatar}></div>

            <div className={s.user_profile}>
              <div className={s.user_name}>
                {store.viewer.user.fullName}
              </div>
              <div className={s.user_email}>
                {store.viewer.user.email}
              </div>
              <Link to={routes.profile} className={s.user_text}>
                Profile
              </Link>
            </div>
          </div>

          <ul className={s.profile_menu}>
            <li>
              <Link to={routes.profile}>Edit Profile</Link>
            </li>
            <li>
              <Link to={routes.profile} onClick={store.auth.logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* <button type="button" onClick={store.auth.logout}> */}
      {/*  Logout */}
      {/* </button> */}
    </div>
  );
});

export const Header = observer(() => {
  const history = useHistory();
  const store = useStore();

  const completedClass = store.auth.isLoggedIn ? s.header_auth : '';

  return (
    <header className={`${s.header} ${completedClass}`}>
      <div className="container">
        <div className={s.left}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to={routes.home} className={s.logo}>
            {store.auth.isLoggedIn ? (
              <Icon name="logo_white" />
            ) : (
              <Icon name="logo" />
            )}
          </Link>
        </div>
        <div className={s.right}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to={routes.home} className={s.primary_link}>
            Sell
          </Link>

          {store.auth.isLoggedIn ? (
            <UserInfo />
          ) : (
            <Link to={routes.login} className={s.outline_link}>
              Login
            </Link>
          )}

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to={routes.home}>
            <Icon name="like" />
          </Link>
        </div>
      </div>
    </header>
  );
});
