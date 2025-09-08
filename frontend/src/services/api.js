// src/services/api.js
import axios from 'axios';

export const api = axios.create({ baseURL: 'https://rdr-store.onrender.com/api',
  withCredentials: true
});
