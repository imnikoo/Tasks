import {
   NOTE_SELECT, NOTES_BY_USER_REQUEST, NOTES_RECEIVE, NOTES_ERROR, NOTE_SAVE_REQUEST,
   NOTE_SAVE_SUCCESS, NOTE_DESELECT, NOTE_BY_ID_REQUEST, NOTE_RECEIVE
} from "../actions/note";

const initialState = {
   notes: [],
   selectedNote: undefined,
   isPending: false,
   isInvalidate: true
};

export default (state = initialState, action) => {
   switch (action.type) {
      case NOTE_BY_ID_REQUEST:
      case NOTE_SAVE_REQUEST:
      case NOTES_BY_USER_REQUEST: {
         return {
            ...state,
            isPending: true
         };
      }
      
      case NOTE_RECEIVE: {
         return {
            ...state,
            selectedNote: action.payload,
            isPending: false,
            isInvalidate: true
         }
      }
      
      case NOTES_RECEIVE: {
         return {
            ...state,
            notes: [ ...action.payload ],
            isPending: false,
            isInvalidate: false
         }
      }
      case NOTES_ERROR: {
         return {
            ...state,
            error: action.error,
            isPending: false
         };
      }
      
      case NOTE_SELECT: {
         return {
            ...state,
            selectedNote: action.payload
         }
      }
      case NOTE_DESELECT: {
         return {
            ...state,
            selectedNote: undefined
         }
      }
      
      case NOTE_SAVE_SUCCESS: {
         return {
            ...state,
            isPending: false,
            isInvalidate: true
         }
      }
      default:
         return state
   }
   
}

