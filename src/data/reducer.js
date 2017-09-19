import { combineReducers } from 'redux';

import members from './member/reducer';
import closedDays from './scheduler/reducer/closedDays';
import events from './scheduler/reducer/events';
import holidays from './scheduler/reducer/holidays';
import pickupDays from './scheduler/reducer/pickUpDays';

export default combineReducers({
    members,
    closedDays,
    events,
    holidays,
    pickupDays,
});