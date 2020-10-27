import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import s from './AddProductForm.module.scss';
import { useStore } from '../../../../stores/createStore';
import { routes } from '../../../routes';
import { Label } from '../../../../components/Form/Label/Label';
import { TextInput } from '../../../../components/Form/TextInput/TextInput';
import { Button } from '../../../../components/Form/Button/Button';
import { TextArea } from '../../../../components/Form/TextArea/TextArea';
import { Icon } from '../../../../components/Icons/Icon';

export const AddProductForm = () => {
  const store = useStore();
  const history = useHistory();
  const fileInputRef = useRef();

  const [state, setState] = useState({
    error: false,
    errorMessage: null,
  });

  const LoginSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is a required field')
      .min(2, 'Seems a bit short...')
      .max(45, 'We prefer insecure system, try a shorter title.'),
    location: Yup.string()
      .required('Location is a required field')
      .min(2, 'Seems a bit short...')
      .max(60, 'We prefer insecure system, try a shorter password.'),
  });

  const chooseImages = () => {
    fileInputRef.current.click();
  };

  return (
    <Formik
      initialValues={{
        title: '',
        location: '',
        description: '',
        price: 0,
        photos: [],
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        const { email, password } = values;

        try {
          await store.auth.login.run({ email, password });

          store.auth.setIsLoggedIn(true);
          history.push(routes.home);
        } catch (err) {
          if (err.response.status === 404) {
            setState({
              error: true,
              errorMessage:
                'Wrong login or password! Please try again!',
            });
          } else {
            setState({
              error: true,
              errorMessage: 'Something goes wrong! Please try again.',
            });
          }

          resetForm({
            title: '',
            location: '',
            description: '',
            price: 0,
            photos: [],
          });
        }
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
        <form className={s.add_product_form} onSubmit={handleSubmit}>
          <div className={s.form_row}>
            <Label htmlFor="title" required>
              Title
            </Label>
            <TextInput
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              placeholder="For example: Iron man suit"
            />
            {errors.title && touched.title ? (
              <span className={s.errors_small}>
                {errors.title && touched.title && errors.title}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="location" required>
              Location
            </Label>
            <TextInput
              type="text"
              name="location"
              id="location"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.location}
              placeholder="For example: Los Angeles, CA"
            />
            {errors.location && touched.location ? (
              <span className={s.errors_small}>
                {errors.location &&
                  touched.location &&
                  errors.location}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              rows={10}
            />
            {errors.description && touched.description ? (
              <span className={s.errors_small}>
                {errors.description &&
                  touched.description &&
                  errors.description}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="description">Photos</Label>
            <div className={s.photos_wrapper}>
              <input
                type="file"
                ref={fileInputRef}
                id="add_photo_inp"
                className={s.hidden_file_input}
              />
              <button
                className={s.add_photo_btn}
                onClick={chooseImages}
              >
                <Icon name="plus" />
              </button>
            </div>
            {errors.photos && touched.photos ? (
              <span className={s.errors_small}>
                {errors.photos && touched.photos && errors.photos}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="price">Price</Label>
            <TextInput
              type="text"
              name="location"
              id="location"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.location}
              placeholder="For example: Los Angeles, CA"
            />
            {errors.price && touched.price ? (
              <span className={s.errors_small}>
                {errors.price && touched.price && errors.price}
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
              className={s.add_product_btn}
            >
              {isSubmitting ? 'Loading...' : 'Submit'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
