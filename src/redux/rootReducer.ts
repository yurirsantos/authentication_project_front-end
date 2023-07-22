import { combineReducers } from 'redux';
import userReducer from './user/reduce';

const rootReducer = combineReducers({ userReducer });

export default rootReducer;
