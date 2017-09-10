import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import './index.css';
import App from './App';
import Cart from './cart';
import Schedule from './schedule';
import createStore from './shared/store';
import history from './shared/history';

// Create Redux global store
const store = createStore();

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <div>
                { /* Add routes here */ }
                <Route exact path="/" component={ App } />
                <Route path="/cart" component={ Cart } />
                <Route path="/schedule" component={ Schedule } />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);