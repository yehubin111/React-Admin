import { combineReducers } from 'redux';
import * as base from './base';
import * as common from './common';

export const persistReducers = ["userInfo", "lang"];
export default combineReducers({
    ...base,
    ...common
});