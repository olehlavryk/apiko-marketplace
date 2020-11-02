import React from 'react';
import s from './UserProfile.module.scss';
import { Text } from '../../components/Text/Text';
import { UserProfileForm } from './components/UserProfileForm/UserProfileForm';

export const UserProfile = () => {
  return (
    <>
      <div className={s.user_profile_scene}>
        <div className="container">
          <div className={s.form_wrapper}>
            <Text>Edit Profile</Text>
            <UserProfileForm />
          </div>
        </div>
      </div>
    </>
  );
};
