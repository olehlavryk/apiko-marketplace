import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import s from './UserStatistics.module.scss';

export const UserStatistics = ({ user }) => {
  console.log(user);

  let initials = user.fullName.match(/\b\w/g) || [];
  initials = (
    (initials.shift() || '') + (initials.pop() || '')
  ).toUpperCase();

  return (
    <>
      {/* User Avatar */}
      <div className={s.user_avatar_block}>
        {user.avatar != null ? (
          <img
            className={s.user_avatar}
            src={user.avatar}
            alt={user.fullName}
          />
        ) : (
          <div className={s.user_without_avatar}>{initials}</div>
        )}
      </div>

      {/* User Full Name */}
      <div className={s.user_name}>{user.fullName}</div>

      {/* User Location */}
      <div className={s.user_location}>{user.location}</div>

      {/* User Tabs */}
      <Tabs defaultIndex={2}>
        <TabList className={s.tabs_header}>
          <Tab className={s.tab_item} selectedClassName={s.active}>
            <div className={`${s.tab_title} ${s.prime_green}`}>
              88%
            </div>
            <span className={s.tab_subtitle}>Positive feedback</span>
          </Tab>
          <Tab className={s.tab_item} selectedClassName={s.active}>
            <div className={`${s.tab_title} ${s.oceanic_blue}`}>
              123
            </div>
            <span className={s.tab_subtitle}>Sales</span>
          </Tab>
          <Tab className={`${s.tab_item}`} selectedClassName={s.active} forceRenderTabPanel>
            <div className={s.tab_title}>12</div>
            <span className={s.tab_subtitle}>Active listings</span>
          </Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
      </Tabs>
    </>
  );
};
