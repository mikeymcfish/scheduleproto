import Member from './model';
import EntityState from './../EntityState';
import { LIST_MEMBERS } from './../../shared/state/action-types';

import moment from 'moment';

export default function (state = new EntityState(), action) {
    switch (action.type) {
        case LIST_MEMBERS.REQUEST:
            return state.merge({
                loaded: false,
                loading: true,
                error: null,
                receivedAt: null,
            });
        case LIST_MEMBERS.SUCCESS:
           return state.merge({
               loaded: true,
               loading: false,
               error: null,
               receivedAt: moment(),
               items: state.items.merge(action.payload.map(member => [member.id, new Member(member)])),
           });
        default:
            return state;
    }
};