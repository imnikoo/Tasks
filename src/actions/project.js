import axios from 'axios';
const http = axios.create({
   baseURL: 'http://localhost:3000/'
});

export const PROJECT_REQUEST_ALL = 'project/PROJECT_REQUEST_ALL';
export const project_request_all = () => {
   return dispatch => {
      dispatch({type: PROJECT_REQUEST_ALL});
      return http({
         method: 'get',
         url: `api/project/`
      }).then((response) => {
         dispatch(project_receive_all(response.data))
      }).catch(err => {
         dispatch(project_error(err));
      });
   }
};

export const PROJECT_RECEIVE_ALL = 'project/PROJECT_RECEIVE_ALL';
export const project_receive_all = (projects) => {
   return dispatch => {
      dispatch({
         type: PROJECT_RECEIVE_ALL,
         payload: projects
      });
   }
};

export const PROJECT_ERROR = 'project/PROJECT_ERROR';
export const project_error = (error) => {
   return dispatch => {
      dispatch({
         type: PROJECT_ERROR,
         payload: error
      });
   }
};

export const PROJECT_SAVE_REQUEST = 'project/PROJECT_SAVE_REQUEST';
export const project_save_request = (newProject) => {
   return dispatch => {
      dispatch({ type: PROJECT_SAVE_REQUEST });
      let method = newProject.id ? 'put' : 'post';
      let projectId = newProject.id || '';
      return http({
         method,
         url: `api/project/${projectId}`,
         data: newProject
      }).then(response => {
         dispatch(project_save_success(response.data));
      }).catch(err => {
         dispatch(project_error(err));
      });
   }
};

export const PROJECT_SAVE_SUCCESS = 'project/PROJECT_SAVE_SUCCESS';
export const project_save_success = (updProject) => {
   return dispatch => {
      dispatch({ type: PROJECT_SAVE_SUCCESS, payload: updProject });
   }
};