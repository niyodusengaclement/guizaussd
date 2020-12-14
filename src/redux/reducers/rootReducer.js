import { combineReducers } from "redux";
import authReducer from "./authReducer";
import menus from "./menusReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  menus,
});

export default rootReducer;
