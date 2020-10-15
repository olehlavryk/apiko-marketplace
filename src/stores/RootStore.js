import { types } from 'mobx-state-tree';

export const RootStore = types
  .model('RootStore', {})
  .actions((store) => ({
    bootstrap() {},
  }));
