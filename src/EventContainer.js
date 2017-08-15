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

        console.log("im rendering a container", this.props.allDupes);

        var containerHTML = [];
        var containers = [];

        var startCol = 1;
        var colSpan = 1;
        var startRow = 1;
        var rowSpan = 1;
        var spanType;
        var killFont = false;

        var usingDay = this.props.allDupes[0];

        console.log("#",Object.keys(this.props.allDupes).length, this.props.allDupes.length )

        var days = usingDay.days;

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
        //TODO ADD ALL MONTHS

        var skipDays = parseInt(this.props.skipDays);

        startCol = $("[data-month="+this.props.month+"][data-daynum="+thisMonthDays[0]+"]")
            .parent()
            .css("grid-column-start")
            .split(" ")[0];
        startRow = $("[data-month="+this.props.month+"][data-daynum="+thisMonthDays[0]+"]")
            .parent()
            .css("grid-row-start")
            .split(" ")[0];

        console.log("**", startRow, startCol);


        //is it just one day??
        if (thisMonthDays.length==1) {
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

            <div className={'event-container-'+usingDay.type} style={{

                gridColumn: "col " + startCol + " / span " + colSpan,
                gridRow: "row " + startRow + " / span " + rowSpan

            }}>
                {this.props.allDupes.map((event, index) => <Event
                    key={index}
                    skipDays={this.props.skipDays}
                    killfont= {killFont}
                    type={event.type}
                    month={event.month}
                    name={event.name}
                    price = {event.price}
                    id = {event.id}
                    age = {event.age}
                    location = {event.location}
                    spotsLeft = {event.spotsLeft}
                    description = {event.description}
                    monthObject={this.props.month}
                    filterAge7to9={this.props.filterAge7to9}
                    filterAge9to11={this.props.filterAge9to11}
                    filterAge12to14={this.props.filterAge12to14}
                    filterLocation={this.props.filterLocation}
                    startTime = {event.startTime}

                />)}
            </div>
        )

    }


}


export default EventContainer;
