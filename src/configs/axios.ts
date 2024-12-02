import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import Cookies from "js-cookie";

axios.defaults.baseURL='https://localhost:7132/api/v1'

axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get('react-template-app-token');
          if (token) {
            config.headers!.Authorization = `Bearer ${token}`;
          }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
        window.location.href = '/auth/login';
      }
      return Promise.reject(error);
    }
  );

export default axios