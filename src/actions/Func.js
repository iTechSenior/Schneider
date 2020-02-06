import { ERROR_MESSAGE, FETCHING } from '../const/Func';

// errorMessage
export const errorMessage = (message) => {
  return (dispatch) => {
    dispatch({type: ERROR_MESSAGE, message})
  }
};
//fetching
export const fetchingFunc = (bool) => {
  return (dispatch) => {
    dispatch({type: FETCHING, bool})
  }
};
