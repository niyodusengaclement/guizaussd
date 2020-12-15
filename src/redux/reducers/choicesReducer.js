import {
  GET_CHOICES_SUCCESS,
  GET_CHOICES_ERROR,
  GET_CHOICES_START,
  CREATE_CHOICE_START,
  CREATE_CHOICE_ERROR,
  DELETE_CHOICE_SUCCESS,
  CREATE_CHOICE_SUCCESS,
  GET_ONE_CHOICE_SUCCESS,
  UPDATE_CHOICE_SUCCESS,
} from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  dragable: true,
  choice: {},
  values: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CHOICES_START:
      return {
        ...state,
        isLoading: true,
        dragable: false,
      };
    case GET_CHOICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        dragable: true,
        values: payload,
      };
    case GET_ONE_CHOICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        dragable: true,
        choice: payload,
      };
    case GET_CHOICES_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        dragable: true,
        error: payload,
      };
    case CREATE_CHOICE_START:
      return {
        ...state,
        isLoading: true,
        dragable: false,
      };
    case CREATE_CHOICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        dragable: true,
        values: [...state.values, payload],
      };
    case UPDATE_CHOICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        dragable: true,
        values: state.values.map((value) =>
          value.record_id !== payload.record_id ? value : payload
        ),
      };
    case CREATE_CHOICE_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        dragable: true,
        error: payload,
      };
    case DELETE_CHOICE_SUCCESS:
      const values = state.values.filter(
        ({ record_id }) => record_id !== payload
      );
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        dragable: true,
        values,
      };
    default:
      return state;
  }
};
