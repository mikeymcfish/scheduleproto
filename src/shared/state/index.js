import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import data from './../../data/reducer';

export default combineReducers({
    router: routerReducer,
    data,
});