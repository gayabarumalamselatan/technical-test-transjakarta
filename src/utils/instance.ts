import axios from "axios";
import environment from "../constants/environment";

const headers = {
  "Content-type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers: headers,
  timeout: 10 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    console.log("Request", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default instance;
