import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import Api from 'src/api/index';
import { Label } from 'src/components/Form/Label/Label';
import { TextInput } from 'src/components/Form/TextInput/TextInput';
import { PasswordInput } from 'src/components/Form/PasswordInput/PasswordInput';
import { routes } from 'src/scenes/routes';
import { Button } from 'src/components/Form/Button/Button';
import s from './LoginForm.module.scss';

export const LoginForm = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  async function onSubmit({ email, password }) {
    const res = await Api.Auth.login({ email, password });

    console.log(res.data);
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is a required field'),
    password: Yup.string()
      .label('Password')
      .required('Password is a required field')
      .min(2, 'Seems a bit short...')
      .max(30, 'We prefer insecure system, try a shorter password.'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
        console.log(values);
        onSubmit(values);
        setSubmitting(false);

      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form className={s.login_form} onSubmit={handleSubmit}>
          <div className={s.form_row}>
            <Label htmlFor="email">Email</Label>
            <TextInput
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Example@gmail.com"
            />
            {errors.email && touched.email ? (
              <span className={s.errors_small}>
                {errors.email && touched.email && errors.email}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Link className={s.resetPasswordLink} to={routes.reset}>
              Don’t remember password?
            </Link>
            {errors.password && touched.password ? (
              <span className={s.errors_small}>
                {errors.password && touched.password && errors.password}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Button disabled={isSubmitting} className={s.login_btn}>
              Continue
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
