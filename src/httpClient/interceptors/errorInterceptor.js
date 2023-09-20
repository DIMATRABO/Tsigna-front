import store from "store";
// const DEBUG = process.env.REACT_APP_NODE_ENV !== "production";
const errorInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use({}, (error) => {
    console.log(error);
    if (error?.request?.status === 401) {
      store.remove("token");
    }
    // else if (error?.status?.code === 403) {
    //     console.log("403");
    // } else {
    //     console.log("else");
    //     //dispatch your error in a more user friendly manner
    //     if (DEBUG) {
    //     //easier debugging
    //     console.group("Error");
    //     console.log(error);
    //     console.groupEnd();
    //     }
    // }
    else throw error;
  });
};
export default errorInterceptor;
