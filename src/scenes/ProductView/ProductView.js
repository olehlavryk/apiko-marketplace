import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router';
import { useProductsCollection } from 'src/stores/Products/ProductsCollection';
import s from './ProductView.module.scss';
import {
  getImagePlaceHolderPath,
  setImagePlaceHolder,
} from '../../stores/utils';
import { Icon } from '../../components/Icons/Icon';
import { UserInfo } from '../../components/User/UserInfo/UserInfo';

export const ProductView = observer(() => {
  const { productId } = useParams();

  const collection = useProductsCollection();
  const product = collection.get(productId);

  useEffect(() => {
    if (!product || !product.owner) {
      collection.getProduct.run(productId);
    }
  }, []);

  if (collection.getProduct.isLoading) {
    return <div>loading...</div>;
  } else if (!product) {
    return <div>Product not found!</div>;
  }
  const timestamp = Date.parse(product.createdAt);
  const date = new Date(timestamp);
  //console.log(product);
  return (
    <main className={s.product_scene}>
      <div className={`${s.content} container`}>
        <article className={s.product_content}>
          {/* Product preview */}
          <div className={s.product_preview}>
            {product.photos ? (
              <img
                src={product.photos}
                alt={product.title}
                onError={(e) => setImagePlaceHolder(e, '580x275')}
              />
            ) : (
              <img
                src={getImagePlaceHolderPath('580x275')}
                alt={product.title}
              />
            )}
          </div>

          {/* Product details */}
          <div className={s.product_details}>
            <div className={s.product_title}>
              {product.title.charAt(0).toUpperCase() +
                product.title.slice(1)}
              <span>{date.toDateString()}</span>
            </div>
            <div className={s.product_location}>
              <Icon name="map" />
              <span>{product.location}</span>
            </div>
            <div className={s.product_description}>
              {product.description}
            </div>
            <div className={s.product_price}>${product.price}</div>
          </div>
        </article>
        <aside className={s.right_sidebar}>
          {product.owner && <UserInfo {...{ product }} />}
        </aside>
      </div>
    </main>
  );
});
