import * as _ from 'lodash';
import {
   PROJECT_ERROR, PROJECT_RECEIVE_ALL, PROJECT_REQUEST_ALL, PROJECT_SAVE_REQUEST,
   PROJECT_SAVE_SUCCESS
} from "../actions/project";
const initialState = {
   projects: [],
   isPending: false,
   outOfDate: true,
   error: ''
};

export default (state = initialState, action) => {
   switch (action.type) {
      case PROJECT_REQUEST_ALL : {
         return {
            ...state,
            isPending: true
         };
      }
      case PROJECT_RECEIVE_ALL: {
         return {
            ...state,
            isPending: false,
            outOfDate: false,
            projects: action.payload
         }
      }
      case PROJECT_ERROR: {
         return {
            ...state,
            isPending: false,
            error: action.payload
         }
      }
      case PROJECT_SAVE_REQUEST: {
         return {
            ...state,
            isPending: true
         };
      }
      case PROJECT_SAVE_SUCCESS: {
         let isThereSuchProject = _.some(state.projects, p => {
            return p._id === action.payload._id
         });
         if (!isThereSuchProject) {
            let newProjects = _.map(state.projects, p => {
               if (p._id !== action.payload._id) {
                  return p;
               }
               return {
                  ...p,
                  ...action.payload
               }
            });
            return {
               ...state,
               isPending: false,
               projects: newProjects
            }
         } else {
            return {
               ...state,
               isPending: false,
               projects: [ ...state.projects, action.payload ]
            }
         }
      }
      default:
         return state
   }
   
}

