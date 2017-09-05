import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './shared/state';

let middleware = [thunk];

let createStoreWithMiddleware = applyMiddleware(...middleware);

// Devtools
if (
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
) {
createStoreWithMiddleware = compose(createStoreWithMiddleware, window.devToolsExtension());
}

export default function create(initialState = {}) {
    return createStoreWithMiddleware(createStore)(reducers, initialState);
}