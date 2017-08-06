import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './webflow.css';
import './App.css';
import './Span-styles.css';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


class Events extends Component {

    render() {
        return (
            <div className ='my-events'>
                <div className="spanner span-monday-friday camp-color camp-span-week-2 selectable">
                    <div className="spanner-copy"> Spring Break Camp
                    </div>
                </div>
                <div className="spanner span-six-weeks series-color span-monday-2-to-5 selectable">
                    <span className="label">Minecraft Mobs</span>
                </div>
                <div className="spanner span-six-weeks series-color span-tuesday-3-to-5 selectable">
                    <span className="label">Series I</span>
                </div>
            </div>

        );
    };

}

export default Events;
