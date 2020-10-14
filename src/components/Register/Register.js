import React from 'react';
import s from './Register.module.scss';
import { Text } from '../Text/Text';
import { Formik } from 'formik';
import { Label } from '../Form/Label/Label';
import { TextInput } from '../Form/TextInput/TextInput';
import { PasswordInput } from '../Form/PasswordInput/PasswordInput';
import { Button } from '../Form/Button/Button';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { routes } from '../../scenes/routes';

export const Register = () => {
  const SignupSchema = Yup.object().shape({
    email: Yup.
    string()
      .email('Invalid email')
      .required('Email is a required field'),
    fullName: Yup.
      string()
      .min(2, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Full name is a required field'),
    password: Yup
      .string()
      .label('Password')
      .required()
      .min(2, 'Seems a bit short...')
      .max(10, 'We prefer insecure system, try a shorter password.'),
    confirmPassword: Yup
      .string()
      .required()
      .label('Confirm password')
      .test('passwords-match', 'Passwords must match...', function(value) {
        return this.parent.password === value;
      }),
  });

  return(
    <div className={s.register_scene}>
      <div className="container">
        {/*  Register Form */}
        <div className={s.form_wrapper}>
          <Text>Register</Text>
          <Formik
            initialValues={{ email: '', fullName: '', password: '', confirmPassword: '' }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
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
              <form onSubmit={handleSubmit} className={s.register_form}>
                <div className={s.form_row}>
                  <Label htmlFor="userEmail">Email</Label>
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
                  <Label htmlFor="fullName">Full name</Label>
                  <TextInput
                    name="fullName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    placeholder="Tony Stark"
                  />
                  {errors.fullName && touched.fullName ? (
                    <span className={s.errors_small}>
                      {errors.fullName && touched.fullName && errors.fullName}
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
                  {errors.password && touched.password ? (
                    <span className={s.errors_small}>
                      {errors.password && touched.password && errors.password}
                    </span>
                  ) : null}
                </div>
                <div className={s.form_row}>
                  <Label htmlFor="confirmPassword">Password again</Label>
                  <PasswordInput
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <span className={s.errors_small}>
                      {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                    </span>
                  ) : null}
                </div>
                <div className={s.form_row}>
                  <Button disabled={isSubmitting} className={s.register_btn}>Register</Button>
                </div>
              </form>
            )}
          </Formik>
        </div>

        {/* Register Box */}
        <div className={s.auth_box}>
          I already have an account, <Link className={s.auth_box_link} to={routes.login}>LOG IN</Link>
        </div>
      </div>
    </div>
  );
}

