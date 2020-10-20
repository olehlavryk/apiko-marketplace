import { getParent, types } from 'mobx-state-tree';
import Api from 'src/api';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';

export const LatestProductsStore = types
  .model('LatestProductsStore', {
    items: types.array(types.reference(ProductModel)),
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
  return async function fetchLatestFlow(flow, store, Root) {
    const res = await Api.Products.fetchLatest();

    const ids = res.data.map((item) => {
      Root.entities.products.add(item.id, item);
      return item.id;
    });

    store.setItems(ids);
    store.setProgressDone();
  };
}
