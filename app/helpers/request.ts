import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    "ngrok-skip-browser-warning": "yes",
  },
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

export {
  getRequest,
  postRequest,
  putRequest,
  delRequest,
  patchRequest,
  axiosInstance,
};
