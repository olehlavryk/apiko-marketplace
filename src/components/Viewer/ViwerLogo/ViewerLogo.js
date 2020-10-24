import React from 'react';
import s from './ViewerLogo.module.scss';

export const ViewerLogo = (props) => {
  const { user } = props;

  let initials = user.fullName.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

  return (
    <div className={s.viewer_box} {...props}>
      {user.avatar != null ? (
        <img
          className={s.viewer_avatar}
          src={user.avatar}
          alt={user.fullName}
        />
      ) : (
        <div className={s.viewer_without_avatar}>
          {initials}
        </div>
      )}
    </div>
  );
};
