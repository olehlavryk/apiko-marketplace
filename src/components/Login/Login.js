import React, { useState } from 'react';
import s from './Login.module.scss';
import { routes } from '../../scenes/routes';
import { Link } from 'react-router-dom';
import { TextInput } from '../Form/TextInput/TextInput';
import { Text } from '../Text/Text';
import { Label } from '../Form/Label/Label';
import { PasswordInput } from '../Form/PasswordInput/PasswordInput';
import { Button } from '../Form/Button/Button';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={s.login_scene}>
        <div className="container">
          {/* Login Form */}
          <div className={s.form_wrapper}>
            <Text>Login</Text>
            <form className={s.login_form} onSubmit={handleSubmit}>
              <div className={s.form_row}>
                <Label htmlFor="userEmail">Email</Label>
                <TextInput
                  value={email}
                  name="userEmail"
                  id="userEmail"
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Example@gmail.com"
                />
              </div>
              <div className={s.form_row}>
                <Label htmlFor="userPassword">Password</Label>
                <PasswordInput name="userPassword" id="userPassword" value={password} onChange={e => setPassword(e.target.value)} />
                <Link className={s.resetPasswordLink} to={routes.reset}>Don’t remember password?</Link>
              </div>
              <div className={s.form_row}>
                <Button disabled={!validateForm()}>Continue</Button>
              </div>
            </form>
          </div>
          {/* Register Box */}
          <div className={s.registerBox}>
            I have no account, <Link className={s.registerLink} to={routes.register}>REGISTER NOW</Link>
          </div>
        </div>
      </div>
    </>
  );
};
