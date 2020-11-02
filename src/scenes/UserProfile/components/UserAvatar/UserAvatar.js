import React, { useRef } from 'react';
import s from './UserAvatar.module.scss';

export const UserAvatar = (props) => {
  const { user } = props;
  const fileInputRef = useRef();

  // todo create maganeged state with image

  let initials = user.fullName.match(/\b\w/g) || [];
  initials = (
    (initials.shift() || '') + (initials.pop() || '')
  ).toUpperCase();

  const uploadPhotoHandle = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <div className={s.user_box} {...props}>
      {user.avatar != null ? (
        <img
          className={s.viewer_avatar}
          src={user.avatar}
          alt={user.fullName}
        />
      ) : (
        <div className={s.viewer_without_avatar}>{initials}</div>
      )}
      <div class={s.upgrade_photo_box}>
        <input
          type="file"
          ref={fileInputRef}
          className={s.file_input}
        />
        <button
          className={s.upgrade_user_photo_btn}
          onClick={(e) => uploadPhotoHandle(e)}
        >
          Upgrade Photo
        </button>
      </div>
    </div>
  );
};
