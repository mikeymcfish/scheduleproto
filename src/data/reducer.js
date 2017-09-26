import { combineReducers } from 'redux';

import cart from './cart/reducer';
import member from './member/reducer';
import events from './scheduler/reducer/events';

export default combineReducers({
    cart,
    member,
    events,
});
