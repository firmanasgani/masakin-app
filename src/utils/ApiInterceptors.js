import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const apiInterceptor = (method, url, data, headers = {}) => {
  return api[method](url, data, { headers })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const get = (url, headers) => apiInterceptor('get', url, null, headers);
export const post = (url, data, headers) => apiInterceptor('post', url, data, headers);
export const put = (url, data, headers) => apiInterceptor('put', url, data, headers);
export const del = (url, headers) => apiInterceptor('delete', url, null, headers);
