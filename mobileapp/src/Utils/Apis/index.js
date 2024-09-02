import axios from 'axios';
import {getItem} from '../Storages';

const API = axios.create({baseURL: 'http://192.168.1.55:5001'});

API.interceptors.request.use(async req => {
  req.withCredentials = true;
  const response = await getItem('profile');
  if (response?.token) {
    req.headers.Authorization = `Bearer ${response?.token}`;
  }

  return req;
});

export const loginApi = async data => API.post('/user/login', data);
export const removeTokenApi = async id => API.delete(`/user/${id}`);
