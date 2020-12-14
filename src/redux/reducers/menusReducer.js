import {
  GET_MENUS_SUCCESS,
  GET_MENUS_ERROR,
  GET_MENUS_START,
  CREATE_MENU_START,
  CREATE_MENU_SUCCESS,
  CREATE_MENU_ERROR,
  DELETE_MENU_SUCCESS,
  CREATE_CHOICE_SUCCESS,
} from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  dragable: true,
  values: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MENUS_START:
      return {
        ...state,
        isLoading: true,
        dragable: false,
      };
    case GET_MENUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        dragable: true,
        values: payload,
      };
    case GET_MENUS_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        dragable: true,
        error: payload,
      };
    case CREATE_MENU_START:
      return {
        ...state,
        isLoading: true,
        dragable: false,
      };
    case CREATE_MENU_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        dragable: true,
        values: {
          rows: [...state.values.rows, payload],
        },
      };
    case CREATE_CHOICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        dragable: true,
        values: state.values,
      };
    case CREATE_MENU_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        dragable: true,
        error: payload,
      };
    case DELETE_MENU_SUCCESS:
      const rows = state.values.rows.filter(
        ({ state_id }) => state_id !== payload
      );
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        dragable: true,
        values: {
          rows,
        },
      };
    default:
      return state;
  }
};
