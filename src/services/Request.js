import axios from "axios";
import authToken from "../utils/authToken";

const token = authToken.getToken();

export const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  responseType: "json",
  headers: {
    "x-auth-token": token,
  },
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;
instance.Cancel = axios.Cancel;

const successResponse = (response) => {
  return response.data;
};

const failResponse = (error) => {
  return Promise.reject(error);
};

const Request = (options) =>
  instance(options).then(successResponse).catch(failResponse);

export default Request;
