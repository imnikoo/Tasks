import {
   AUTH_ERROR,
   AUTH_RECEIVE,
   AUTH_REQUEST,
   REGISTER_ERROR,
   REGISTER_RECEIVE,
   REGISTER_REQUEST
} from "../actions/auth";

const initialState = {
   isPending: false,
   userId: window.localStorage.getItem('UserId'),
   token: window.localStorage.getItem('Access-token'),
   authInterval: undefined
};

export default (state = initialState, action) => {
   switch (action.type) {
      case AUTH_REQUEST:
      case REGISTER_REQUEST: {
         return {
            ...state,
            isPending: true
         };
      }
      
      case AUTH_RECEIVE: {
         window.localStorage.setItem('Access-token', action.payload.token);
         window.localStorage.setItem('UserId', action.payload.userId);
         
         return {
            ...state,
            token: action.payload.token,
            userId: action.payload.userId,
            isPending: false,
            authInterval: setInterval(() => {
               window.localStorage.removeItem('Access-token');
               window.localStorage.removeItem('UserId');
            }, 1800)
         };
      }
      
      case REGISTER_RECEIVE: {
         return {...state, isPending: false};
      }
      
      case REGISTER_ERROR:
      case AUTH_ERROR: {
         return {
            ...state,
            error: action.error,
            isPending: false
         };
      }
      
      default:
         return state
   }
   
}

