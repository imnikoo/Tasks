import {NOTIFICATION_CLOSE, NOTIFICATION_SHOW} from "../actions/notification";

const initialState = {
   show: false,
   type: '',
   message: ''
};

export default (state = initialState, action) => {
   switch (action.type) {
      case NOTIFICATION_SHOW: {
         return {
            ...state,
            show: true,
            type: action.notificationType,
            message: action.message
         };
      }

      case NOTIFICATION_CLOSE: {
         return {
            ...state,
            show: false
         };
      }
      default:
         return state
   }

}

