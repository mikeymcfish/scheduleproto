import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './../auth/reducer';
import data from './../../data/reducer';

export default combineReducers({
    router: routerReducer,
    auth,
    data,
});