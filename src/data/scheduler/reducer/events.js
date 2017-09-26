import Event from './../model/event';
import EntityState from './../../EntityState';
import { LIST_SCHEDULE_EVENT } from './../../../shared/state/action-types';

import moment from 'moment';

export default function (state = new EntityState(), action) {
    switch (action.type) {
        case LIST_SCHEDULE_EVENT.REQUEST:
            return state.merge({
                loaded: false,
                loading: true,
                error: null,
                receivedAt: null,
            });
        case LIST_SCHEDULE_EVENT.SUCCESS:
           return state.merge({
               loaded: true,
               loading: false,
               error: null,
               receivedAt: moment(),
               items: state.items.merge(action.payload.map(event => [event.id, new Event(event)])),
           });
        default:
            return state;
    }
};