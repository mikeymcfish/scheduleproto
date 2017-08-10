import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import App from './App';
import Events from './Event';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));


registerServiceWorker();
