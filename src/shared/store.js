import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './state';
import history from './history';

let middleware = [
    thunk,
    routerMiddleware(history),
];

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