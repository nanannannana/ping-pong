import { combineReducers } from "redux";
import user from "./user";
import chat from "./chat";

export default combineReducers({
  user,
  chat,
});
