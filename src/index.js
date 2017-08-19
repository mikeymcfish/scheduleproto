import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import App from './App';
import $ from 'jquery';

import registerServiceWorker from './registerServiceWorker';
import seriesJSON from "./series.json";

var _this = this;
var allEvents = seriesJSON;
$.getJSON("/Users/mikefischthal/WebstormProjects/scheduleproto/src/series.json", function(data) {
   console.log("got JSON");
});

ReactDOM.render(<App events={allEvents}/>, document.getElementById('root'));


registerServiceWorker();
