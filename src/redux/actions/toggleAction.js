import creator from "./creator";

export const toggleAction = (actionType) => async (dispatch) => {
  try {
    dispatch(creator(actionType));
  } catch (e) {
    console.error(e);
  }
};
