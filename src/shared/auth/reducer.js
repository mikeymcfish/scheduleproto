import Auth from './model';
import { AUTH } from './../state/action-types';
import State from './state';

import { Map } from 'immutable';
import moment from 'moment';

export default function (state = new State, action) {
    switch (action.type) {
        case AUTH.REQUEST:
            return state.merge({
                loaded: false,
                loading: true,
                error: null,
                receivedAt: null,
                person: null,
            });
        case AUTH.SUCCESS:
            return state.merge({
                loaded: true,
                loading: false,
                error: null,
                receivedAt: moment(),
                person: new Auth(action.payload),
            });
        default:
            return state;
    }
}