import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import s from './UserStatistics.module.scss';
import { useStore } from '../../../stores/createStore';
import { Product } from '../../Product/Product';

export const UserStatistics = observer( ({ user }) => {
  const store = useStore();
  useEffect(() => {
    store.ownProducts.fetch.run(user.id);
  }, []);

  if (store.ownProducts.fetch.isLoading) {
    return <div>Loading ...</div>;
  }

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
          <Tab className={`${s.tab_item}`} selectedClassName={s.active}>
            <div className={s.tab_title}>{store.ownProducts.items.length}</div>
            <span className={s.tab_subtitle}>Active listings</span>
          </Tab>
        </TabList>

        <TabPanel>
          <div className={s.tab_panel_content}>
            <h2>List of positive feedback</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.tab_panel_content}>
            <h2>Sales products</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.tab_panel_content}>
            <ul className={s.products_list}>
              {store.ownProducts.items.map((item) => (
                <li key={item.id}>
                  <Product {...{ item }} />
                </li>
              ))}
            </ul>
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
});
