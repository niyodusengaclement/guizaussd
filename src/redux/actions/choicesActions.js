import { toast } from "react-toastify";
import HttpRequest from "../../services/HttpRequest";
import creator from "./creator";
import {
  CREATE_CHOICE_START,
  CREATE_CHOICE_ERROR,
  CREATE_CHOICE_SUCCESS,
  GET_CHOICES_SUCCESS,
  GET_CHOICES_ERROR,
  GET_CHOICES_START,
  GET_ONE_CHOICE_SUCCESS,
  DELETE_CHOICE_SUCCESS,
  UPDATE_CHOICE_SUCCESS,
} from ".";

export const findAll = () => async (dispatch) => {
  try {
    dispatch(creator(GET_CHOICES_START));
    const res = await HttpRequest.get(`/choices`);
    dispatch(creator(GET_CHOICES_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_CHOICES_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const findOne = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_CHOICES_START));
    const res = await HttpRequest.get(`/choices/${data.record_id}`);
    dispatch(creator(GET_ONE_CHOICE_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_CHOICES_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const createChoice = (data) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_CHOICE_START));
    const res = await HttpRequest.post("/choices", data);
    toast.success(res.message);
    dispatch(creator(CREATE_CHOICE_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_CHOICE_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const updateMenuOnDrop = (data, ussd_new_state) => async (dispatch) => {
  try {
    // if (data.changes.length <= 1) return;
    const response = await HttpRequest.patch(`/choices/drop/${ussd_new_state}`, data);
    toast.success(response.message);
    dispatch(creator(CREATE_CHOICE_SUCCESS, response.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_CHOICE_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};

export const deleteChoice = (record_id) => async (dispatch) => {
  try {
    const res = await HttpRequest.delete(`/choices/${record_id}`);
    toast.success(res.message);
    dispatch(creator(DELETE_CHOICE_SUCCESS, record_id));
  } catch (e) {
    if (e.response && e.response.data) {
      return toast.error(e.response.data.error);
    }
  }
};

export const updateChoice = (data, record_id) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_CHOICE_START));
    const res = await HttpRequest.put(`/choices/${record_id}`, data);
    toast.success(res.message);
    dispatch(creator(UPDATE_CHOICE_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_CHOICE_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
};
