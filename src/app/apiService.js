import axios from "axios";
import { BASE_URL } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    console.log("Start Request", request);

    return request;
  },
  function (error) {
    console.log("ERROR", {error});
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR", {error});
    const message = error.response?.data?.errors?.message || "Unknown Error"
    return Promise.reject(error);
  }
);

export default apiService;