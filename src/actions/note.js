
import { notification_show }from './notification';
import axios from 'axios';
const http = axios.create({
   baseURL: 'http://localhost:3000/'
});

export const NOTE_BY_ID_REQUEST = 'note/NOTE_BY_ID_REQUEST';
export const note_by_id_request = (noteId) => {
   return dispatch => {
      dispatch({type: NOTE_BY_ID_REQUEST});
      http({
         method: 'get',
         url: `api/notes/${noteId}`,
         headers: {'Access-token': window.localStorage.getItem('Access-token')}
      }).then(response => {
         dispatch(note_receive(response.data));
      }).catch(err => {
         dispatch(notes_error(err));
         dispatch(notification_show('ERROR', err.message));
      });
   };
};

export const NOTE_RECEIVE = 'note/NOTE_RECEIVE';
export const note_receive = (note) => {
   return dispatch => {
      dispatch({
         type: NOTE_RECEIVE,
         payload: note
      });
   }
};

export const NOTES_BY_USER_REQUEST = 'note/NOTES_BY_USER_REQUEST';
export const notes_by_user_request = (userId) => {
   return dispatch => {
      dispatch({type: NOTES_BY_USER_REQUEST});
      http({
         method: 'get',
         url: `api/notes/user/${userId}`,
         headers: {'Access-token': window.localStorage.getItem('Access-token')}
      }).then(response => {
         dispatch(notes_receive(response.data));
      }).catch(err => {
         dispatch(notes_error(err));
         dispatch(notification_show('ERROR', err.message));
      });
   };
};

export const NOTES_RECEIVE = 'note/NOTES_RECEIVE';
export const notes_receive = (notes) => {
   return dispatch => {
      dispatch({
         type: NOTES_RECEIVE,
         payload: notes
      });
   }
};

export const NOTES_ERROR = 'note/NOTES_ERROR';
export const notes_error = (error) => {
   return dispatch => {
      dispatch({
         type: NOTES_ERROR,
         error
      });
   }
};

export const NOTE_SELECT = 'note/NOTE_SELECT';
export const note_select = (note) => {
   return dispatch => {
      dispatch({
         type: NOTE_SELECT,
         payload: note
      });
   }
};

export const NOTE_DESELECT = 'note/NOTE_DESELECT';
export const note_deselect = () => {
   return dispatch => {
      dispatch({
         type: NOTE_DESELECT
      });
   }
};

export const NOTE_SAVE_REQUEST = 'note/NOTE_SAVE_REQUEST';
export const note_save_request = (newNote) => {
   return dispatch => {
      dispatch({ type: NOTE_SAVE_REQUEST });
      let method = newNote.id ? 'put' : 'post';
      let noteId = newNote.id || '';
      http({
         method,
         url: `api/notes/${noteId}`,
         headers: {'Access-token': window.localStorage.getItem('Access-token')},
         data: newNote
      }).then(response => {
         dispatch(note_save_success(response.data));
      }).catch(err => {
         dispatch(notes_error(err));
         dispatch(notification_show('ERROR', err.message));
      });
   }
};

export const NOTE_SAVE_SUCCESS = 'note/NOTE_SAVE_SUCCESS';
export const note_save_success = (updatedNote) => {
   return dispatch => {
      dispatch({ type: NOTE_SAVE_SUCCESS, payload: updatedNote });
   }
};