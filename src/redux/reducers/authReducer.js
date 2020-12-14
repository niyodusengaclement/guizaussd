import {
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  user: {},
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_ACCOUNT_START:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        user: payload,
      };
    case CREATE_ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: payload,
      };
    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        user: payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: payload,
      };
    default:
      return state;
  }
};
