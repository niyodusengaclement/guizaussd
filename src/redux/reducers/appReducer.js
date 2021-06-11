/* eslint-disable import/no-anonymous-default-export */
import * as types from "../types";

const initialState = {
  allApps: {},
  newApp: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ALL_APPLICATIONS:
      return {
        ...state,
        allApps: {
          isLoading: payload?.isLoading || false,
          data: payload?.data || {},
        },
      };
    case types.CREATE_NEW_APP:
      return {
        ...state,
        newApp: {
          isLoading: payload?.isLoading || false,
          data: payload?.data || {},
        },
      };
    default:
      return state;
  }
};
