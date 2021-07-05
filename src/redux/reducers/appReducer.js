/* eslint-disable import/no-anonymous-default-export */
import * as types from "../types";

const initialState = {
  allApps: {},
  newApp: {},
  updated: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ALL_APPLICATIONS:
      return {
        ...state,
        updated: false,
        allApps: {
          isLoading: payload?.isLoading || false,
          data: payload?.data || {},
        },
      };
    case types.CREATE_NEW_APP:
      return {
        ...state,
        updated: false,
        newApp: {
          isLoading: payload?.isLoading || false,
          data: payload?.data || {},
        },
      };
    case types.DELETE_APP:
      return {
        ...state,
        updated: false,
        newApp: {},
        allApps: {
          isLoading: payload?.isLoading || false,
          data: payload?.data?.data ? payload?.data : state?.allApps?.data,
        },
      };
    case types.UPDATE_APP:
      return {
        ...state,
        updated: true,
        updatedApp: payload?.data,
        allApps: {
          isLoading: payload?.isLoading || false,
          data: payload?.data?.data ? payload?.data : state?.allApps?.data,
        },
      };
    default:
      return state;
  }
};
