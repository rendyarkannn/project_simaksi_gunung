import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (fullName, email, password, confirmPassword) =>
  API.post('/auth/register', { fullName, email, password, confirmPassword });

export const login = (email, password) =>
  API.post('/auth/login', { email, password });

export const verifyToken = () =>
  API.get('/auth/verify');

// Admin API
export const adminLogin = (email, password) =>
  API.post('/admin/login', { email, password });

export const adminVerifyToken = () =>
  API.get('/admin/verify');

export const getUsers = () =>
  API.get('/admin/users');

export const deleteUser = (userId) =>
  API.delete(`/admin/users/${userId}`);

export default API;
