import Event from './../model/event';
import EntityState from './../../EntityState';
import { LIST_SCHEDULE_CLOSED_DAY } from './../../../shared/state/action-types';

import moment from 'moment';

export default function (state = new EntityState(), action) {
    switch (action.type) {
        default:
            return state;
    }
};