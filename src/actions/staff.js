import axios from 'axios';
const http = axios.create({
   baseURL: 'http://localhost:3000/'
});

export const STAFF_REQUEST_ALL = 'staff/STAFF_REQUEST_ALL';
export const staff_request_all = () => {
   return dispatch => {
      dispatch({type: STAFF_REQUEST_ALL});
      return http({
         method: 'get',
         url: `api/programmer/`
      }).then((response) => {
         dispatch(staff_receive_all(response.data))
      }).catch(err => {
         dispatch(staff_error(err));
      });
   }
};

export const STAFF_RECEIVE_ALL = 'staff/STAFF_RECEIVE_ALL';
export const staff_receive_all = (programmers) => {
   return dispatch => {
      dispatch({
         type: STAFF_RECEIVE_ALL,
         payload: programmers
      });
   }
};

export const STAFF_ERROR = 'staff/STAFF_ERROR';
export const staff_error = (error) => {
   return dispatch => {
      dispatch({
         type: STAFF_ERROR,
         payload: error
      });
   }
};

export const STAFF_PROGRAMMER_SAVE_REQUEST = 'staff/STAFF_PROGRAMMER_SAVE_REQUEST';
export const staff_programmer_save_request = (newProgrammer) => {
   return dispatch => {
      dispatch({ type: STAFF_PROGRAMMER_SAVE_REQUEST });
      let method = newProgrammer.id ? 'put' : 'post';
      let programmerId = newProgrammer.id || '';
      return http({
         method,
         url: `api/programmer/${programmerId}`,
         data: newProgrammer
      }).then(response => {
         dispatch(staff_programmer_save_success(response.data));
      }).catch(err => {
         dispatch(staff_error(err));
      });
   }
};

export const STAFF_PROGRAMMER_SAVE_SUCCESS = 'staff/STAFF_PROGRAMMER_SAVE_SUCCESS';
export const staff_programmer_save_success = (updProgrammer) => {
   return dispatch => {
      dispatch({ type: STAFF_PROGRAMMER_SAVE_SUCCESS, payload: updProgrammer });
   }
};