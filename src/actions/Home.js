import { SCREEN_MAIN, SAVE_ANFRAGE } from '../const/Home';

//Welcome
export const screenMain = (name) => {
  return (dispatch) => {
    dispatch({type: SCREEN_MAIN, name})
  }
};


//SaveAnfrage
export const saveAnfrage = (data) => {
  return (dispatch) => {
    dispatch({type: SAVE_ANFRAGE, data})
  }
};
