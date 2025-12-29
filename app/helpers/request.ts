import axios from 'axios';
import { API_BASE_URL } from './config';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'yes',
  },
  withCredentials: true,
});

//use to logout use when token expire
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    if (error.response && error.response.status === 403) {
      localStorage.clear();
      // window.location.href = ROUTES.HOME;
    }
    return Promise.reject(error);
  }
);

// helper for get APIs
const getRequest = async (url: string, config = {}) =>
  axiosInstance.get(url, config);

// helper for post APIs
const postRequest = async (url: string, body: any, config = {}) =>
  axiosInstance.post(url, body, config);

// helper for put APIs
const putRequest = async (url: string, body: any, config = {}) =>
  axiosInstance.put(url, body, config);

// helper for delete APIs
const delRequest = async (url: string, config = {}) =>
  axiosInstance.delete(url, config);

// helper for patch APIs
const patchRequest = async (url: string, body: any, config = {}) =>
  axiosInstance.patch(url, body, config);

const getS3SignedUrl = async (payload: any) => {
  const response = await axios.post(
    `${API_BASE_URL}/app/generate-signed-url`,
    payload
  );
  if (!response.data) return null;
  return response.data.result;
};

const uploadUsingSignedUrl = async (signedUrl: string, file: any) => {
  const response = await axios.put(signedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
  console.log('Response==>', response);
  if (!response.data) return null;
  return response.data.result;
};

export {
  getRequest,
  postRequest,
  putRequest,
  delRequest,
  patchRequest,
  axiosInstance,
  getS3SignedUrl,
  uploadUsingSignedUrl,
};
