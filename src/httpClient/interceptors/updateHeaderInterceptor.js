import store from "store";

const updateHeaderInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    const storeToken = store.get("data");
    if (storeToken) {
      config.headers["Authorization"] = `Bearer ${storeToken?.accessToken}`;
    }
    return config;
  });
};
export default updateHeaderInterceptor;
