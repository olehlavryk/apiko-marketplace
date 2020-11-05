import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'src/components/Form/Button/Button';
import { TextArea } from 'src/components/Form/TextArea/TextArea';
import { Label } from 'src/components/Form/Label/Label';
import s from './SellerContactForm.module.scss';

export const SellerContactForm = () => {
  const [state, setState] = useState({
    error: false,
    errorMessage: null,
  });

  const formValidationSchema = Yup.object().shape({
    message: Yup.string()
      .required('Message is a required field')
      .min(2, 'Seems a bit short...')
      .max(300, 'Massage has max 300 symbols length'),
  });

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      validationSchema={formValidationSchema}
      onSubmit={async (values, { resetForm, setFieldValue }) => {
        // const { title, location, description, price } = values;
        // const photos = await handleUploadImages();
        // console.log(photos);
        // try {
        //   await store.entities.products.addProduct.run({
        //     title,
        //     location,
        //     description,
        //     price,
        //     photos,
        //   });
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
        //       errorMessage:
        //         'Something goes wrong! Please try again.',
        //     });
        //   }
        //   resetForm({
        //     title: '',
        //     location: '',
        //     description: '',
        //     price: 0,
        //     photos: [],
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
        <form
          className={s.seller_contact_form}
          onSubmit={handleSubmit}
        >
          <div className={s.form_row}>
            <Label htmlFor="message" required>
              Message
            </Label>
            <TextArea
              id="message"
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              rows={10}
            />
            {errors.message && touched.message ? (
              <span className={s.errors_small}>
                {errors.message && touched.message && errors.message}
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
              className={s.form_btn}
            >
              {isSubmitting ? 'Loading...' : 'Submit'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
