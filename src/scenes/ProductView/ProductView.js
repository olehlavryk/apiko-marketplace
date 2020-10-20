import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router';
import { useProductsCollection } from 'src/stores/Products/ProductsCollection';
import s from './ProductView.module.scss';

export const ProductView = observer(() => {
  const { productId } = useParams();

  const collection = useProductsCollection();
  const product = collection.get(productId);

  useEffect(() => {
    if (!product) {
      collection.getProduct.run(productId);
    }
  }, []);

  if (collection.getProduct.isLoading) {
    return <div>loading...</div>;
  } else if (!product) {
    return <div>Product not found!</div>;
  }

  return <div>{product.title}</div>;
});
