import { types } from 'mobx-state-tree';
import { UserModel } from './Users/UserModel';

export const ViewerStore = types
  .model('ViewerStore', {
    user: types.maybe(UserModel),
  })
  .actions((store) => ({
    setViewer(user) {
      store.user = user;
    },
  }));
