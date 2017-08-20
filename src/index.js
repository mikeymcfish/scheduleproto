import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import App from './App';
import $ from 'jquery';

import registerServiceWorker from './registerServiceWorker';
import seriesJSON from "./series.json";

var _this = this;


ReactDOM.render(<App/>, document.getElementById('root'));


registerServiceWorker();
