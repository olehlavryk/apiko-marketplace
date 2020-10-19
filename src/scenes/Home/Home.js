import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Header } from '../../components/Header/Header';
import s from './Home.module.scss';
import { useStore } from '../../stores/createStore';

export const Home = observer(() => {
  const store = useStore();
  useEffect(() => {
    store.latestProducts.fetchLatest.run();
  }, []);

  if (store.latestProducts.fetchLatest.inProgress) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Header />
      <div>
        Home scene
        {store.latestProducts.items.map((item) => <li>{item.title}</li>)}
      </div>
    </>
  );
});
