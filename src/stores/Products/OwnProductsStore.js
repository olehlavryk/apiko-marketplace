import { types } from 'mobx-state-tree';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';

export const OwnProducts = types.model('OwnProductsStore', {
  items: types.array(types.reference(types.late(() => ProductModel))),
  fetch: asyncModel(fetchOwnProducts),
});

function fetchOwnProducts() {
  return async function fetchOwnProductsFlow(flow, store) {

  }
}
