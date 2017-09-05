import { Record, Map } from 'immutable';

const EntityBase = defaultValues => class extends Record({
    loading: false,
    loaded: false,
    error: null,
    receivedAt: null,
    items: new Map(),
    ...defaultValues,
}) {
};

export default EntityBase;