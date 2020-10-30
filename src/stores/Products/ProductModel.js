import { getRoot, types, getParent, flow } from 'mobx-state-tree';
import { UserModel } from '../Users/UserModel';
import Api from '../../api';

export const ProductModel = types
  .model('ProductModel', {
    id: types.identifierNumber,
    ownerId: types.number,
    title: types.string,
    description: types.maybeNull(types.string),
    photos: types.maybeNull(types.array(types.string)),
    location: types.string,
    price: types.number,
    saved: types.optional(types.boolean, false),
    createdAt: types.string,
    updatedAt: types.string,
    owner: types.maybe(types.late(() => UserModel)),
  })
  .views((store) => ({
    get firstLetterToUpper() {
      return (
        store.title.charAt(0).toUpperCase() + store.title.slice(1)
      );
    },
  }))
  .actions((store) => ({
    productSave: flow(function* productSave() {
      store.saved = !store.saved;

      try {
        yield Api.Products.saveById(+store.id);

        console.log('saved successfully!');
      } catch (e) {
        console.log(e);
        store.likeRevert();
      }
    }),

    removeProductSave: flow(function* productSave() {
      const oldValue = store.saved;
      store.saved = !store.saved;

      try {
        yield Api.Products.removeSaveById(+store.id);

        console.log('removed saved successfully!');
      } catch (e) {
        console.log(e);
        store.likeRevert();
      }
    }),
    likeRevert() {
      store.saved = !store.saved;
    },
  }));
