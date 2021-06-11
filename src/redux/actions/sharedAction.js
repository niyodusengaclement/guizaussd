/* eslint-disable import/prefer-default-export */
import { message } from "antd";
import axios from "axios";
import AuthToken from "../../utils/authToken";
import creator from "./creator";

export const sharedAction =
  (method, endpoint, actionType, data) => async (dispatch) => {
    try {
      const baseUrl = "http://localhost:5000/api";
      axios.defaults.headers["x-auth-token"] = AuthToken.getToken();
      dispatch(creator(actionType, { isLoading: true }));
      const res = await axios[method](baseUrl + endpoint, data);
      const msg = res?.data?.message;
      if (method !== "get" && msg) message.success(msg);
      return dispatch(creator(actionType, { data: res?.data }));
    } catch (e) {
      console.error(e);
      const error = e.response?.data?.error || e?.message;
      if (error) message.error(error);
      return dispatch(
        creator(actionType, {
          data: {
            error,
          },
        })
      );
    }
  };
