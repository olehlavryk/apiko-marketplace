import { getParent, types } from 'mobx-state-tree';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import Api from 'src/api';

export const LatestProductsStore = types
  .model('LatestProductsStore', {
    items: types.array(ProductModel),
    fetchLatest: asyncModel(fetchLatest),
    inProgress: true,
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
    setProgressDone() {
      store.inProgress = false;
    },
  }));

function fetchLatest() {
  return async function fetchLatestFlow(flow, store) {
    const res = await Api.Products.fetchLatest();

    store.setItems(res.data);
    store.setProgressDone();
  };
}
