import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import auth from "./auth";
import notification from "./notification";
import note from "./note";

export default combineReducers({
    router: routerReducer,
    auth,
   notification,
   note
})
