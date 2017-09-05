import { Provider } from 'react-redux';
import createStore from './store';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import App from './App';
import $ from 'jquery';

import registerServiceWorker from './registerServiceWorker';
import seriesJSON from "./series.json";

var _this = this;

// Create Redux global store
const store = createStore();

ReactDOM.render(
    <Provider store={ store }>
        <App/>
    </Provider>,
    document.getElementById('root')
);


registerServiceWorker();
