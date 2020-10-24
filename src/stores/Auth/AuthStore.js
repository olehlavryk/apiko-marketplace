import { getRoot, types } from 'mobx-state-tree';
import { asyncModel } from '../utils';
import Api from '../../api';

export const AuthStore = types
  .model('AuthStore', {
    login: asyncModel(loginFlow),
    isLoggedIn: false,
    register: asyncModel(registerFlow),
  })
  .actions((store) => ({
    setIsLoggedIn(value) {
      store.isLoggedIn = value;
    },
    logout() {
      store.setIsLoggedIn(false);
      Api.Auth.logout();
    },
  }));

function loginFlow({ password, email }) {
  return async (flow) => {
    const res = await Api.Auth.login({ password, email });
    console.log(res.data);

    Api.Auth.setToken(res.data.token);

    getRoot(flow).viewer.setViewer(res.data.user);
  };
}

function registerFlow({ email, password, fullName}) {
  return async (flow) => {
    const res = await Api.Auth.register({ email, password, fullName});

    //todo set user and viwer and redirect to home
    //console.log(res.data)
    Api.Auth.setToken(res.data.token);

    getRoot(flow).viewer.setViewer(res.data.user);
  }
}
