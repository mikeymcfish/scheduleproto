import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import App from './App';

import Events from './Events';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

//ReactDOM.render(<Events />, document.getElementById('calendar'));

registerServiceWorker();
