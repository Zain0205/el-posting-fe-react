import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

// Tambahkan interceptor untuk handling error
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

export default instance;