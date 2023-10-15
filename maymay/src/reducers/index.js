import { combineReducers } from "redux";
import tutorialReducer from "./tutorials";
import postReducer from "./posts";

export default combineReducers({
    tutorialReducer,
    postReducer
});