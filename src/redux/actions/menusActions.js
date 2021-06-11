import { message } from "antd";
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
    message.success(response.message);
    const res = await HttpRequest.get(`/menus`);
    dispatch(creator(GET_MENUS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_MENU_ERROR, e.response.data.error));
      return message.error(e.response.data.error);
    }
  }
};

export const createMenuChild = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_MENU_START, true));
    const response = await HttpRequest.post("/menus/child", data);
    message.success(response.message);
    const res = await HttpRequest.get(`/menus`);
    dispatch(creator(GET_MENUS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_MENU_ERROR, e.response.data.error));
      return message.error(e.response.data.error);
    }
  }
};

export const deleteMenu = (app_id, state_id) => async (dispatch) => {
  try {
    const res = await HttpRequest.delete(`/menus/${app_id}/${state_id}`);
    message.success(res.message);
    dispatch(creator(DELETE_MENU_SUCCESS, state_id));
  } catch (e) {
    if (e.response && e.response.data) {
      return message.error(e.response.data.error);
    }
  }
};

export const findAll = (app_id) => async (dispatch) => {
  try {
    dispatch(creator(GET_MENUS_START, true));
    const res = await HttpRequest.get(`/menus/${app_id}`);
    dispatch(creator(GET_MENUS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_MENUS_ERROR, e.response.data.error));
      return message.error(e.response.data.error);
    }
  }
};

export const updateMenu = (data, state_id) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_MENU_START));
    const res = await HttpRequest.put(`/menus/${state_id}`, data);
    message.success(res.message);
    dispatch(creator(UPDATE_MENU_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_MENU_ERROR, e.response.data.error));
      return message.error(e.response.data.error);
    }
  }
};
