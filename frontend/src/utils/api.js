import axios from 'axios';
import config from 'src/config';

const Api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

export default Api;
