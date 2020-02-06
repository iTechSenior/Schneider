import { CHANGE_LANG } from '../const/Main'

import de from './de';
import en from './en';

const INITIAL_STATE = {
  lang: de
};

const language = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case CHANGE_LANG:
      return {
        ...state,
        lang: action.lang === 'en' ? en : de
      }
    default:
      return state;
  }
}

export default language
