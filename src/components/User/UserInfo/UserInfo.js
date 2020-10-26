import React from 'react';
import { NavLink, generatePath, Link } from 'react-router-dom';
import s from './UserInfo.module.scss';
import { Icon } from '../../Icons/Icon';
import {
  getImagePlaceHolderPath,
  setImagePlaceHolder,
} from '../../../stores/utils';
import { routes } from '../../../scenes/routes';

export const UserInfo = ({ product }) => {
  const { avatar, fullName, location, id } = product.owner;

  return (
    <>
      <div className={s.seller_info}>
        <div className={s.seller_avatar}>
          {/* todo if avatar is empty set placeholder */}
          {avatar ? (
            <img
              src={avatar}
              alt={fullName}
              onError={(e) => setImagePlaceHolder(e, '40x40')}
            />
          ) : (
            <img
              src={getImagePlaceHolderPath('40x40')}
              alt={fullName}
            />
          )}
        </div>
        <div className={s.seller_name}>
          <Link
            to={generatePath(routes.user, {
              userId: id,
            })}
          >
            {fullName}
          </Link>
        </div>
        {location && (
          <div className={s.seller_location}>{location}</div>
        )}
      </div>
      <button className={s.seller_chat_btn}>Chat with seller</button>
      <button className={s.add_to_favorite_btn}>
        <Icon name="like" size="16px" />
        <span>Add to favorite</span>
      </button>
    </>
  );
};
