import axios from 'axios';
import { routes } from '../scenes/routes';
import { useHistory } from 'react-router';

export const Auth = {
  _token: null,

  setToken(token) {
    this._token = token;
    localStorage.setItem('__token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  async logout() {
    this._token = null;
    await localStorage.removeItem('__token');
    axios.defaults.headers.common.Authorization = `undefined`;
  },

  isLoggedIn() {
    return !!this._token;
  },

  login({ email, password }) {
    return axios.post('/api/auth/login', {
      email,
      password,
    });
  },
  register({ email, password, fullName }) {
    return axios.post('/api/auth/register', {
      email,
      password,
      fullName,
    });
  },
};

export const Account = {
  getUser() {
    return axios.get('/api/account');
  },
};

export const Products = {
  fetchLatest() {
    return axios.get('/api/products/latest');
  },

  getById(id) {
    return axios.get(`/api/products/${id}`);
  },

  byUserId(id) {
    return axios.get(`/api/users/${id}/products`);
  },
};

export const Users = {
  getById(id) {
    return axios.get(`/api/users/${id}`);
  },
};
