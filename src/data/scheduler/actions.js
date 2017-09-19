import request from './../../shared/request';
import {
    LIST_SCHEDULE_CLOSED_DAY,
    LIST_SCHEDULE_EVENT,
    LIST_SCHEDULE_HOLIDAY,
    LIST_SCHEDULE_PICKUP_DAY,
} from './../../shared/state/action-types';

function listScheduleRequested(type) {
    return {
        type: type.REQUEST,
    };
}

function listScheduleSuccess(type, data) {
    return {
        type: type.SUCCESS,
        payload: data,
    };
}

function listScheduleFailed(type, error) {
    return {
        type: type,
        payload: error,
    };
}

export function fetchSchedule() {
    return dispatch => {
        dispatch(listScheduleRequested(LIST_SCHEDULE_CLOSED_DAY));
        dispatch(listScheduleRequested(LIST_SCHEDULE_EVENT));
        dispatch(listScheduleRequested(LIST_SCHEDULE_HOLIDAY));
        dispatch(listScheduleRequested(LIST_SCHEDULE_PICKUP_DAY));

        // Remove .json
        return request.get('/api/v1/scheduler/all.json')
            .then(response => {
                dispatch(listScheduleSuccess(LIST_SCHEDULE_EVENT, response.data.events));
            })
            .catch(error => {
                console.log('lis-schedule-error', error);
            });
    }
}