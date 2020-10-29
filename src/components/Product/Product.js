import React from 'react';
import { generatePath, Link, NavLink } from 'react-router-dom';
import { values } from 'mobx';
import s from './Product.module.scss';
import { Icon } from '../Icons/Icon';
import { routes } from '../../scenes/routes';
import {
  setImagePlaceHolder,
  getImagePlaceHolderPath,
} from '../../stores/utils';

export const Product = (props) => {
  const { item } = props;

  let productPreview = null;

  try {
    productPreview = (
      <img
        src={values(item.photos)[0]}
        alt={item.title}
        className={s.product_preview}
        onError={(e) => setImagePlaceHolder(e, '500x500')}
      />
    );
  } catch (err) {
    productPreview = (
      <img
        src={getImagePlaceHolderPath()}
        alt={item.title}
        className={s.product_preview}
        onError={(e) => setImagePlaceHolder(e, '500x500')}
      />
    );
  }

  return (
    <div className={s.product}>
      <NavLink
        to={generatePath(routes.product, { productId: item.id })}
      >
        {productPreview}
      </NavLink>
      <div className={s.product_info}>
        <Link
          to={generatePath(routes.product, { productId: item.id })}
          className={s.product_title}
        >
          {item.title}
        </Link>
        <div className={s.product_price}>${item.price}</div>
        <div className={s.product_like_wrap}>
          {item.save ? (
            <Icon name="like" className="product_like" />
          ) : (
            <Icon name="like_green" className="product_like" />
          )}
        </div>
      </div>
    </div>
  );
};
