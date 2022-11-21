import axios from "axios";
import errorInterceptor from "./interceptors/errorInterceptor";
import updateHeaderInterceptor from "./interceptors/updateHeaderInterceptor";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
errorInterceptor(httpClient);
updateHeaderInterceptor(httpClient);
export default httpClient;
