import React from "react";
import T from 'prop-types';
import s from './Label.module.scss'

export const Label = ({children, htmlFor }) => {
  return(
    <label htmlFor={htmlFor} className={s.formLabel}>{children}</label>
  )
}

Label.propTypes = {
  children: T.string.isRequired,
  htmlFor: T.string
}
