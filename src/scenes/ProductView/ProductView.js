import React from 'react';
import { useParams } from 'react-router';
import s from './ProductView.module.scss';

export const ProductView = () => {
  const params = useParams();

  return <div>ProductId: {params.productId}</div>;
};
