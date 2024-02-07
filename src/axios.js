import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4444",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
}); //middleware. Automatically send an authorization token with each request, allowing the server to authenticate the user or client and grant access to protected resources or transactions.
export default instance;
