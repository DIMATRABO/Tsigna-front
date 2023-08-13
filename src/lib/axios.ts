import axios from "axios";

const API_URL = "https://api.tsignal.store";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (request) => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (
      request.baseURL === `${API_URL}/users/auth` ||
      request.baseURL === `${API_URL}/users`
    ) {
      return request;
    }

    if (!token) {
      return request;
    }

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.request;
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Access Token expired" &&
      !originalRequest._retry &&
      localStorage.getItem("refresh_token") !== null &&
      sessionStorage.getItem("refresh_token") !== null
    ) {
      originalRequest._retry = true;
      const refreshToken =
        localStorage.getItem("refresh_token") ||
        sessionStorage.getItem("refresh_token");

      return instance
        .post("/users/refresh", { refresh_token: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("access_token", res.data.access_token);
            return instance(originalRequest);
          }
        });
    }

    if (
      error.response?.status === 400 &&
      error.response?.data.message === "Refresh Token Expired"
    ) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
