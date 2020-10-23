import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import s from './Home.module.scss';
import { useStore } from '../../stores/createStore';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { Product } from '../../components/Product/Product';

export const Home = observer(() => {
  const store = useStore();
  useEffect(() => {
    store.latestProducts.fetchLatest.run();
  }, []);

  if (store.latestProducts.fetchLatest.isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <main className={s.home_scene}>
        <div className="container">
          <FilterBar />
          <div className={s.products_section}>
            <ul className={s.products_list}>
              {store.latestProducts.items.map((item) => (
                <li key={item.id}>
                  <Product {...{ item }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
});
