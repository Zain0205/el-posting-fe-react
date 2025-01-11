import axios from "axios";

const instance = axios.create({
  baseURL: "/api",  // Ubah ini dari URL lengkap menjadi relatif
  withCredentials: true
});

export default instance;