import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import Event from './Event';
import $ from 'jquery';

class EventContainer extends Component {

    constructor() {
        super();
        this.state = {count: 0};

    }

    render() {
        var containerHTML = [];
        var containers = [];

        var days = [];
        var startCol = 1;
        var colSpan = 1;
        var startRow = 1;
        var rowSpan = 1;
        var spanType;
        days = this.props.thisDupe.split(",");

        var skipDays = parseInt(this.props.skipDays);

        startRow = 2 + Math.ceil((parseInt(days[0]) + skipDays) / 7);
        startCol = (parseInt(days[0]) + skipDays) % 7;
        startCol == 0 ? startCol = 7 : startCol += 0;

        rowSpan = Math.floor((parseInt(days[1]) + skipDays) / 7) - Math.floor((parseInt(days[0]) + skipDays) / 7) + 1;
        colSpan = (parseInt(days[1]) - parseInt(days[0])) < 7 ? (parseInt(days[1]) - parseInt(days[0])) : 1;

        colSpan = this.props.type == "series" ? colSpan : 5;
        rowSpan = this.props.type == "camp" ? 1 : rowSpan;

        return(

            <div className={'event-container-'+this.props.type} style={{

                gridColumn: "col " + startCol + " / span " + colSpan,
                gridRow: "row " + startRow + " / span " + rowSpan,
                zIndex: 100

            }}>
                {this.props.allDupes.map((event, index) => <Event key={index} month={event.month} name={event.name} type={event.type} skipDays={event.skipDays} monthObject={this}/>)}
            </div>
        )

    }


}


export default EventContainer;
