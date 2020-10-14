import React from "react";
import T from 'prop-types';
import s from './TextInput.module.scss';

export const TextInput = ({ value, ...props  })  => {
  return(
    <input type="text" className={s.formTextInput} value={value} {...props} />
  )
}

TextInput.propTypes = {
  value: T.string,
}
