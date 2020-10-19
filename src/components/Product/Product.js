import React from 'react';
import { Link } from 'react-router-dom';
import s from './Product.module.scss';
import { Icon } from '../Icons/Icon';

export const Product = (props) => {
  const { item } = props;
  const imagePlaceHolder = 'https://via.placeholder.com/500x500';

  function addDefaultSrc(ev) {
    ev.target.src = imagePlaceHolder;
  }

  return (
    <div className={s.product}>
      <Link to="#">
        {item.photos[0] ? (
          <img
            src={item.photos[0]}
            alt={item.title}
            className={s.product_preview}
            onError={addDefaultSrc}
          />
        ) : (
          <img
            src={imagePlaceHolder}
            alt={item.title}
            className={s.product_preview}
          />
        )}
      </Link>
      <div className={s.product_info}>
        <Link to="#" className={s.product_title}>
          {item.title.charAt(0).toUpperCase()
          + item.title.slice(1)}
        </Link>
        <div className={s.product_price}>${item.price}</div>
        <Link to="#" className={s.product_like_wrap}>
          {item.save ? (
            <Icon name="like" className="product_like" />
          ) : (
            <Icon name="like_green" className="product_like" />
          )}
        </Link>
      </div>
    </div>
  );
};
