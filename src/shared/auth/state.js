import { Record } from 'immutable';

export default class extends Record ({
    loaded: false,
    loading: false,
    error: null,
    receivedAt: null,
    person: null,
}) {
    // Nothing!
}