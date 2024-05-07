import { authKey } from "@/components/Utils/AuthService/authContants";
import { getFromLocalStorage } from "@/components/Utils/AuthService/localStorage";
import axios from "axios";
import { IGenericErrorResponse, ResponseSuccessType } from "./Types/common";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObj: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObj;
  },
  function (error) {
    const responseObj: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      success: error?.response?.data?.success || false,
      message: error?.response?.data?.message || "Something went wrong !",
      errorMessage: error?.response?.data?.message || "Something went wrong !",
    };

    return responseObj;
  }
);

export { axiosInstance };
