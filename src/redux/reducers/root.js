import {combineReducers} from 'redux';
import crypto from './cryptoReducer';

const rootReducer = combineReducers({
  //! This reducer will be used to store the version.
  1: (state = {}) => state,
  crypto,
});

export default rootReducer;
