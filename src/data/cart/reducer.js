import { LIST_CART } from './../../shared/state/action-types';

import { Set, Record } from 'immutable';
import moment from 'moment';

const State = new Record({
    loading: false,
    loaded: false,
    error: null,
    receivedAt: null,
    items: new Set(),
});

export default function (state = new State, action) {
    switch (action.type) {
        case LIST_CART.SUCCESS:
            return state.merge({
                loaded: true,
                loading: false,
                error: null,
                receivedAt: moment(),
                items: state.items.union(action.payload),
            });
        default:
            return state;
    }
}