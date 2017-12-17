import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import staff from './staff';
import project from './project';

export default combineReducers({
   router: routerReducer,
   staff,
   project
})
