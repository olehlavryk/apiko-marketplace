import React from 'react';
import s from './Register.module.scss';
import { Text } from '../../components/Text/Text';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import { RegisterForm } from './components/RegisterForm/RegisterForm';

export const Register = () => {

  return(
    <div className={s.register_scene}>
      <div className="container">
        {/*  Register Form */}
        <div className={s.form_wrapper}>
          <Text>Register</Text>
          <RegisterForm />
        </div>

        {/* Register Box */}
        <div className={s.auth_box}>
          I already have an account, <Link className={s.auth_box_link} to={routes.login}>LOG IN</Link>
        </div>
      </div>
    </div>
  );
}

