import React, { Component } from 'react';
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

        var startCol = 1;
        var colSpan = 1;
        var startRow = 1;
        var rowSpan = 1;
        var spanType;

        var days = this.props.days;

        console.log(days);

        var thisMonthDays = [];

        if (typeof days.September != "undefined" && this.props.month == "September") {
            thisMonthDays = days.September;
        }
        else if (typeof days.October != "undefined" && this.props.month == "October") {
            thisMonthDays = days.October;
        }
        else if (typeof days.November != "undefined" && this.props.month == "November") {
            thisMonthDays = days.November;
        }
        else if (typeof days.December != "undefined" && this.props.month == "December") {
            thisMonthDays = days.December;
        }
        else {

            return(null);
        }

        var skipDays = parseInt(this.props.skipDays);

        startCol = $("[data-month="+this.props.month+"][data-daynum="+thisMonthDays[0]+"]")
            .parent()
            .css("grid-column-start")
            .split(" ")[0];
        startRow = $("[data-month="+this.props.month+"][data-daynum="+thisMonthDays[0]+"]")
            .parent()
            .css("grid-row-start")
            .split(" ")[0];

        console.log(startRow, startCol);

        var killFont = false;
        //is it just one day??
        if (thisMonthDays.length==1) {
            colSpan = 1;
            rowSpan = 1;
            //make font smaller?
            killFont = true;
        } else {

            var endRow = $("[data-month=" + this.props.month + "][data-daynum=" + thisMonthDays[thisMonthDays.length - 1] + "]")
                .parent()
                .css("grid-row-start")
                .split(" ")[0];
            var endCol = $("[data-month=" + this.props.month + "][data-daynum=" + thisMonthDays[thisMonthDays.length - 1] + "]")
                .parent()
                .css("grid-column-start")
                .split(" ")[0];

            colSpan = endCol - startCol + 1;
            rowSpan = endRow - startRow + 1;
        }

        return(

            <div className={'event-container-'+this.props.type} style={{

                gridColumn: "col " + startCol + " / span " + colSpan,
                gridRow: "row " + startRow + " / span " + rowSpan,
                zIndex: 100

            }}>
                {this.props.allDupes.map((event, index) => <Event
                    key={index}
                    skipDays={this.props.skipDays}
                    type={event.type}
                    month={event.month}
                    name={event.name}
                    price = {event.price}
                    id = {event.id}
                    age = {event.age}
                    location = {event.location}
                    spotsleft = {event.spotsLeft}
                    description = {event.description}
                    monthObject={this}
                    days={event.days}

                />)}
            </div>
        )

    }


}


export default EventContainer;
