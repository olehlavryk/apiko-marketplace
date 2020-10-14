import React from 'react';
import s from './Login.module.scss';
import { routes } from '../routes';
import { Link } from 'react-router-dom';
import { Text } from '../../components/Text/Text';
import { LoginForm } from './components/LoginForm/LoginForm';
import * as Yup from 'yup';

export const Login = () => {


  return (
    <>
      <div className={s.login_scene}>
        <div className="container">
          {/* Login Form */}
          <div className={s.form_wrapper}>
            <Text>Login</Text>
            <LoginForm />
          </div>
          {/* Register Box */}
          <div className={s.auth_box}>
            I have no account, <Link className={s.auth_box_link} to={routes.register}>REGISTER NOW</Link>
          </div>
        </div>
      </div>
    </>
  );
};
