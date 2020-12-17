import { combineReducers } from "redux";
import authReducer from "./authReducer";
import menus from "./menusReducer";
import choices from "./choicesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  menus,
  choices,
});

export default rootReducer;
