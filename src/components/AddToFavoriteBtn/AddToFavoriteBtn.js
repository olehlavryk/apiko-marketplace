import React, { useState } from 'react';
import s from './AddToFavoriteBtn.module.scss';
import { observer } from 'mobx-react';
import { Icon } from '../Icons/Icon';

export const AddToFavoriteBtn = observer(({ product }) => {
  const [state, setState] = useState({ isFavorite: product.saved });

  const handleProductLike = async () => {
    await product.productSave();
    if (product.saved) {
      setState({ isFavorite: !state.isFavorite });
    }
  };

  const handleProductDisLike = async () => {
    await product.removeProductSave();

    if (!product.saved) {
      setState({ isFavorite: !state.isFavorite });
    }
  };

  if (state.isFavorite) {
    return (
      <button
        className={s.favorited_btn}
        onClick={handleProductDisLike}
      >
        <Icon name="like_white" size="16px" />
        <span>Favourited</span>
      </button>
    );
  }

  return (
    <button
      className={s.add_to_favorite_btn}
      onClick={handleProductLike}
    >
      <Icon name="like" size="16px" />
      <span>Add to favorite</span>
    </button>
  );
});
