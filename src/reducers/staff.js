import {
   STAFF_ERROR, STAFF_PROGRAMMER_SAVE_REQUEST, STAFF_PROGRAMMER_SAVE_SUCCESS, STAFF_RECEIVE_ALL,
   STAFF_REQUEST_ALL
} from "../actions/staff";
import * as _ from 'lodash';
const initialState = {
   programmers: [],
   isPending: false,
   outOfDate: true,
   error: ''
};

export default (state = initialState, action) => {
   switch (action.type) {
      case STAFF_REQUEST_ALL : {
         return {
            ...state,
            isPending: true
         };
      }
      case STAFF_RECEIVE_ALL: {
         return {
            ...state,
            isPending: false,
            programmers: action.payload,
            outOfDate: false
         }
      }
      case STAFF_ERROR: {
         return {
            ...state,
            isPending: false,
            error: action.payload
         }
      }
      case STAFF_PROGRAMMER_SAVE_REQUEST: {
         return {
            ...state,
            isPending: true
         };
      }
      case STAFF_PROGRAMMER_SAVE_SUCCESS: {
         let isThereSuchProgrammer = _.some(state.programmers, p => {
            return p._id === action.payload._id
         });
         if (isThereSuchProgrammer) {
            let newProgrammers = _.map(state.programmers, p => {
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
               programmers: newProgrammers
            }
         } else {
            return {
               ...state,
               isPending: false,
               programmers: [ ...state.programmers, action.payload ]
            }
         }
      }
      default:
         return state
   }
   
}

