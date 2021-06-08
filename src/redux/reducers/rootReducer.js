import { combineReducers } from "redux";
import authReducer from "./authReducer";
import menus from "./menusReducer";
import choices from "./choicesReducer";
import app from "./appReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  menus,
  choices,
  app,
});

export default rootReducer;
