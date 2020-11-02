import React, { useState } from 'react';
import s from './UserProfileForm.module.scss';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { Label } from 'src/components/Form/Label/Label';
import { TextInput } from 'src/components/Form/TextInput/TextInput';
import { PasswordInput } from 'src/components/Form/PasswordInput/PasswordInput';
import { routes } from 'src/scenes/routes';
import { Button } from 'src/components/Form/Button/Button';
import { UserAvatar } from './../UserAvatar/UserAvatar';

export const UserProfileForm = () => {
  const store = useStore();
  const history = useHistory();

  const [state, setState] = useState({
    error: false,
    errorMessage: null,
  });
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const ProfileSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Full name is a required field'),
    phone: Yup.string().matches(
      phoneRegExp,
      'Phone number is not valid',
    ),
  });

  return (
    <Formik
      initialValues={{
        fullName: store.viewer.user.fullName,
        phone: store.viewer.user.phone,
      }}
      validationSchema={ProfileSchema}
      onSubmit={async (values, { resetForm }) => {
        const { fullName, phone } = values;

        // try {
        //   await store.auth.login.run({ email, password });

        //   store.auth.setIsLoggedIn(true);
        //   history.push(routes.home);
        // } catch (err) {
        //   if (err.response.status === 404) {
        //     setState({
        //       error: true,
        //       errorMessage:
        //         'Wrong login or password! Please try again!',
        //     });
        //   } else {
        //     setState({
        //       error: true,
        //       errorMessage: 'Something goes wrong! Please try again.',
        //     });
        //   }

        //   resetForm({
        //     email: '',
        //     password: '',
        //   });
        // }
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
        <form className={s.profile_form} onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className={s.form_row}>
            <UserAvatar user={store.viewer.user} />
          </div>

          <div className={s.form_row}>
            <Label htmlFor="email">Full Name</Label>
            <TextInput
              type="text"
              name="fullName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullName}
            />
            {errors.fullName && touched.fullName ? (
              <span className={s.errors_small}>
                {errors.fullName &&
                  touched.fullName &&
                  errors.fullName}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="email">Phone Number</Label>
            <TextInput
              type="text"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            {errors.phone && touched.phone ? (
              <span className={s.errors_small}>
                {errors.phone && touched.phone && errors.phone}
              </span>
            ) : null}
          </div>

          {state.error ? (
            <span className={s.errors_small}>
              {state.errorMessage}
            </span>
          ) : null}

          <div className={s.form_row}>
            <Button
              disabled={isSubmitting}
              type="submit"
              className={s.login_btn}
            >
              {isSubmitting ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
