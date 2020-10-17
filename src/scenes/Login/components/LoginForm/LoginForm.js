import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { Label } from 'src/components/Form/Label/Label';
import { TextInput } from 'src/components/Form/TextInput/TextInput';
import { PasswordInput } from 'src/components/Form/PasswordInput/PasswordInput';
import { routes } from 'src/scenes/routes';
import { Button } from 'src/components/Form/Button/Button';
import s from './LoginForm.module.scss';

export const LoginForm = () => {
  const store = useStore();
  const history = useHistory();

  async function onSubmit(values) {
    const { email, password } = values;

    // todo if false error in login form else redirect

    try {
      await store.auth.login.run({ email, password });
    } catch (err) {
      console.log('error!!!');
    }



    history.push(routes.home);
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
      onSubmit={(values) => {
        // send login form
        onSubmit(values);
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
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link className={s.resetPasswordLink} to={routes.reset}>
              Don’t remember password?
            </Link>
            {errors.password && touched.password ? (
              <span className={s.errors_small}>
                {errors.password &&
                  touched.password &&
                  errors.password}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Button
              disabled={isSubmitting}
              type="submit"
              className={s.login_btn}
            >
              {isSubmitting ? 'Loading...' : 'Continue'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
