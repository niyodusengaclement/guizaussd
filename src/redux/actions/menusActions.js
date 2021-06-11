import { toast } from "react-toastify";
import HttpRequest from "../../services/HttpRequest";
import creator from "./creator";
import {
  GET_MENUS_SUCCESS,
  GET_MENUS_ERROR,
  GET_MENUS_START,
  CREATE_MENU_START,
  CREATE_MENU_ERROR,
  DELETE_MENU_SUCCESS,
  UPDATE_MENU_SUCCESS,
} from "../types";

export const createMenu = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_MENU_START, true));
    const response = await HttpRequest.post("/menus", data);
    toast.success(response.message);
    const res = await HttpRequest.get(`/menus`);
    dispatch(creator(GET_MENUS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_MENU_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const createMenuChild = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_MENU_START, true));
    const response = await HttpRequest.post("/menus/child", data);
    toast.success(response.message);
    const res = await HttpRequest.get(`/menus`);
    dispatch(creator(GET_MENUS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_MENU_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const deleteMenu = (state_id) => async (dispatch) => {
  try {
    const res = await HttpRequest.delete(`/menus/${state_id}`);
    toast.success(res.message);
    dispatch(creator(DELETE_MENU_SUCCESS, state_id));
  } catch (e) {
    if (e.response && e.response.data) {
      return toast.error(e.response.data.error);
    }
  }
};

export const findAll = () => async (dispatch) => {
  try {
    dispatch(creator(GET_MENUS_START, true));
    const res = await HttpRequest.get(`/menus`);
    dispatch(creator(GET_MENUS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_MENUS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const updateMenu = (data, state_id) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_MENU_START));
    const res = await HttpRequest.put(`/menus/${state_id}`, data);
    toast.success(res.message);
    dispatch(creator(UPDATE_MENU_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_MENU_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};
