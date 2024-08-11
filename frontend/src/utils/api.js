import axios from 'axios';

export const baseURL = 'https://ifastacademy.onrender.com/api/v1/';
export const clientURL = 'http://localhost:3000/';

const Api = axios.create({
  baseURL,
  withCredentials: true,
});

export default Api;
