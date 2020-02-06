import { CHANGE_LANG } from '../const/Main';

//Welcome
export const changeLang = (lang) => {
  return (dispatch) => {
    dispatch({type: CHANGE_LANG, lang})
  }
};
