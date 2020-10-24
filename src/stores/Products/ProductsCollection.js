import Api from 'src/api';import { ProductModel } from './ProductModel';import { asyncModel, createCollection } from '../utils';import { useStore } from '../createStore';export const ProductsCollection = createCollection(ProductModel, {  getProduct: asyncModel(getProduct),});export function useProductsCollection() {  const store = useStore();  return store.entities.products;}function getProduct(id) {  return async function getProductFlow(flow, store) {    try {      const res = await Api.Products.getById(id);      store.add(res.data.id, res.data);    } catch (e) {      console.log(e);    }  };}