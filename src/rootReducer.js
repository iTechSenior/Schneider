import { combineReducers } from 'redux';

import Main from './reducers/Main';
import language from './language/language';
import Home from './reducers/Home'

const rootReducer = combineReducers({
  main: Main,
  language: language,
  home: Home
});

export default rootReducer;
