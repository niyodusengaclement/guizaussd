import { toast } from "react-toastify";
import HttpRequest from "../../services/HttpRequest";
import creator from "./creator";
import {
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../types";
import AuthToken from "../../utils/authToken";

export const createAccount = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_ACCOUNT_START, true));
    const res = await HttpRequest.post("/auth/register", data);
    toast.success(res.message);
    dispatch(creator(CREATE_ACCOUNT_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_ACCOUNT_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch(creator(LOGIN_START, true));
    const res = await HttpRequest.post("/auth/login", data);
    AuthToken.setToken(res.data);
    dispatch(creator(LOGIN_SUCCESS, res.data));
    window.location.assign("/dashboard");
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(LOGIN_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    await HttpRequest.get("/auth/logout");
    toast.success("You are successfully logged out");
    window.location.assign("/auth/login");
  } catch (e) {
    if (e.response && e.response.data) {
      window.location.assign("/auth/login");
    }
  }
};
