import React from 'react';
import s from './UserInfo.module.scss';
import { Icon } from '../Icons/Icon';

export const UserInfo = ({ product }) => {
  console.log(product);
  const { avatar, fullName, location } = product.owner;

  return (
    <>
      <div className={s.seller_info}>
        <div className={s.seller_avatar}>
          {/* todo if avatar is empty set placeholder */}
          <img src={avatar} alt={fullName} />
        </div>
        <div className={s.seller_name}>{fullName}</div>
        <div className={s.seller_location}>{location}</div>
      </div>
      <button className={s.seller_chat_btn}>Chat with seller</button>
      <button className={s.add_to_favorite_btn}>
        <Icon name="like" size="16px" />
        <span>
          Add to favorite
        </span>
      </button>
    </>
  );
};
