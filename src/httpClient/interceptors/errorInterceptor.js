// const DEBUG = process.env.REACT_APP_NODE_ENV !== "production";
const errorInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use({}, (error) => {
    if (error?.response?.data.status === 401) {
      console.log("401");
    } else if (error?.status?.code === 403) {
      console.log("403");
    } else {
      console.log("else");
      //dispatch your error in a more user friendly manner
      // if (DEBUG) {
      //   //easier debuggings
      //   console.group("Error");
      //   console.log(error);
      //   console.groupEnd();
      // }
    }
  });
};
export default errorInterceptor;
