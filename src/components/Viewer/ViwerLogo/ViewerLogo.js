import React from 'react';
import s from './ViewerLogo.module.scss';

export const ViewerLogo = ({ user }) => {
  const firstLettersArr = user.fullName.split(' ');

  return (
    <div className={s.viewer_box}>
      {user.avatar != null ? (
        <img
          className={s.viewer_avatar}
          src={user.avatar}
          alt={user.fullName}
        />
      ) : (
        <div className={s.viewer_without_avatar}>
          {firstLettersArr[0][0]}
          {firstLettersArr[1][0]}
        </div>
      )}
    </div>
  );
};
