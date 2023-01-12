import { combineReducers } from 'redux';
import userStore from './userReducer';

const rootReducer = combineReducers({
  users: userStore
});

export default rootReducer;
