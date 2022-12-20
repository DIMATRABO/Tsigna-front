import store from "store";

const updateHeaderInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    const storeToken = store.get("token");
    if (storeToken) {
      config.headers["Authorization"] = `Bearer ${storeToken}`;
    }
    return config;
  });
};
export default updateHeaderInterceptor;
