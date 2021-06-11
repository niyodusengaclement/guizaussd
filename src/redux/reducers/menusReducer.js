import {
  GET_MENUS_SUCCESS,
  GET_MENUS_ERROR,
  GET_MENUS_START,
  CREATE_MENU_START,
  CREATE_MENU_SUCCESS,
  CREATE_MENU_ERROR,
  DELETE_MENU_SUCCESS,
  UPDATE_MENU_SUCCESS,
} from "../types";

const initialState = {
  isLoading: false,
  btnLoading: false,
  isLoaded: false,
  dragable: true,
  values: { rows: [] },
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
        btnLoading: false,
        values: payload,
      };
    case GET_MENUS_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        btnLoading: false,
        dragable: true,
        error: payload,
      };
    case CREATE_MENU_START:
      return {
        ...state,
        dragable: false,
        btnLoading: true,
      };
    case CREATE_MENU_SUCCESS:
      return {
        ...state,
        isLoading: false,
        btnLoading: false,
        isLoaded: true,
        dragable: true,
        values: {
          rows: [...state.values.rows, payload],
        },
      };
    case CREATE_MENU_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        dragable: true,
        btnLoading: false,
        error: payload,
      };

    case UPDATE_MENU_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        dragable: true,
        btnLoading: false,
        values: {
          rows: state.values.rows.map((value) =>
            value.state_id !== payload.state_id ? value : payload
          ),
        },
      };
    case DELETE_MENU_SUCCESS:
      const rows = state.values.rows.filter(
        ({ state_id }) => state_id !== payload
      );
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        btnLoading: false,
        dragable: true,
        values: {
          rows,
        },
      };
    default:
      return state;
  }
};
