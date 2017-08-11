import React, { Component } from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';
import Day from './Day';
import Event from './Event';
import EventContainers from "./EventContainer";
import seriesJSON from "./series.json";
import App from "./App";


class Month extends React.Component {
    RenderDay(i, isclosed, dropinevents, specialevents, inCart) {

        //Hold up, is this a super special day?

        // if (this.props.name=="November" && i==18) {
        //     //minecon
        //     return <Day closed="true" minecon="true"/>
        //
        // }


        //filters
        var dropInList = [];
        var specialList = "";
        if (isclosed) return <Day closed="true"/>
        if (!this.props.filterDropIn)
        {
            dropInList = dropinevents;
        }
        if (!this.props.filterSpecial)
        {
            specialList = specialevents;
        }

        return <Day month={this.props.name} value={i} dropinevents={dropInList} specialevents={specialList} incart={inCart}/>

        //RANDOM TESTING
        //
        // if (random1 >.8) return <Day month={this.props.name} value={i} dropinevents="Makerspace,Tournament" specialevents="Guest Pass"/>;
        // else if (random1 >.4) return <Day month={this.props.name}  value={i} dropinevents="Makerspace" specialevents="Guest Pass" inCart="true"/>;
        // else if (random1 >.2) return <Day month={this.props.name}  value={i} specialevents="Guest Pass"/>;
        // else return <Day month={this.props.name}  value={i}/>;
        //

        //
    }

    RenderAllDays(c) {

        var allDays = [];

        for (var i = 1; i < c; i++) {
            console.log("i = "+ i);

            allDays.push(
                this.RenderDay(i)
            );
        }
        return  (
            <div>
                {allDays.map(day =>  {day} )}
            </div>
        );

    }

    RenderWeekNames(i) {
        return (
            <div className="week-names">{i}</div>
        )
    }

    RenderEvent(name, type, startCol, colSpan, startRow, rowSpan) {

        var spanType;

        switch (type) {

            case 'six-weeks' :
                spanType = 'span-six-weeks series-color ';
                break;
            case 'five-days' :
                spanType = 'span-monday-friday camp-color';
                break;
            default :
                spanType = '';
                break;
        }



        return (

            <div className={spanType+ ' spanner selectable'} style={{

                gridColumn: "col " + startCol + " / span " + colSpan,
                gridRow: "row " + startRow + " / span " + rowSpan,
                zIndex: 100

            }}>
                <span className='label'>{name}</span>
            </div>
        )
    }

    componentWillUpdate() {
        global.overlappingSeriesEvents = [];
        global.overlappingCampEvents = [];

    }

    constructor() {
        super();
        global.overlappingSeriesEvents = [];
        global.overlappingCampEvents = [];
        //TODO ALL EVENTS HERE
        global.allEvents = seriesJSON;
        //TODO 'DAYSTRING' for all
    }

    parseForSingleDayEvents(allEvents, checkDay, filter) {

        var dropineventsforthismonth = [];
        //add all dupes to an array (but originals are not there yet)
        for (var i=0; i < allEvents.length; i++) {
            //is it dropin? if not continue.


            if (allEvents[i].type!=filter) {
                continue;
            }

            var days = allEvents[i].days;

            var thisMonthDays = [];

            if (typeof days.September != "undefined" && this.props.name == "September") {
                thisMonthDays = days.September;
            }
            else if (typeof days.October != "undefined" && this.props.name == "October") {
                thisMonthDays = days.October;
            }
            else if (typeof days.November != "undefined" && this.props.name == "November") {
                thisMonthDays = days.November;
            }
            else if (typeof days.December != "undefined" && this.props.name == "December") {
                thisMonthDays = days.December;
            }
            else if (typeof days.January != "undefined" && this.props.name == "January") {
                thisMonthDays = days.January;
            }
            else if (typeof days.February != "undefined" && this.props.name == "February") {
                thisMonthDays = days.February;
            }
            else if (typeof days.March != "undefined" && this.props.name == "March") {
                thisMonthDays = days.March;
            }
            else if (typeof days.April != "undefined" && this.props.name == "April") {
                thisMonthDays = days.April;
            }
            else if (typeof days.May != "undefined" && this.props.name == "May") {
                thisMonthDays = days.May;
            }
            else if (typeof days.June != "undefined" && this.props.name == "June") {
                thisMonthDays = days.June;
            }
            else if (typeof days.July != "undefined" && this.props.name == "July") {
                thisMonthDays = days.July;
            }
            else if (typeof days.August != "undefined" && this.props.name == "August") {
                thisMonthDays = days.August;
            }
            else {
                //if it doesnt have days this month, gtfo
                continue;
            }

            if (thisMonthDays[0] == checkDay) dropineventsforthismonth.push(allEvents[i]);

        }
        return(dropineventsforthismonth);

    }


    render() {

        var allDays = [];
        for (var i = 1; i <= this.props.skipDays; i++) {
            allDays.push(
                <div id="no-day"></div>
            );
        }

        for (var i = 1; i <= this.props.numDays; i++) {


            var dropinevents = [];
            var specialevents = [];
            var isclosed = false;
            var inCart = false;


            dropinevents = this.parseForSingleDayEvents(global.allEvents.events, i, "drop-in");
            specialevents = this.parseForSingleDayEvents(global.allEvents.events, i, "special");

            allDays.push(
                isclosed? <div id="closed-day"></div> : this.RenderDay(i, isclosed, dropinevents, specialevents, inCart)
            );

        }

        var eventsList = [];
        var tempSeriesEventsList = [];
        var tempCampEventsList = [];

        var seriesDupeDates = [];
        var campDupeDates = [];

        var overlappingEvents = [];
        var overlappingCamp = [];

        var overlappingEventsIndex = [];

        if (!this.props.filterSeries) {
            //all series
            var holdingEvents = [];

            //add all dupes to an array (but originals are not there yet)
            for (var i=0; i < global.allEvents.events.length; i++) {
                if (global.allEvents.events[i].type=="series") {
                    // global.allEvents.events[i].skipDays = this.props.skipDays;
                    if (holdingEvents.indexOf(global.allEvents.events[i].daystring)>=0) {

                        //overlappingEvents.push(global.allEvents.events[i]);
                        var idx = global.allEvents.events[i].daystring;
                        console.log(idx);
                        overlappingEventsIndex[idx] ? overlappingEventsIndex[idx] = overlappingEventsIndex[idx] : overlappingEventsIndex[idx] = [];
                        console.log(overlappingEventsIndex);
                        overlappingEventsIndex[idx].push(global.allEvents.events[i]);
                        seriesDupeDates.push(global.allEvents.events[i].daystring);

                    } else{
                        holdingEvents.push(global.allEvents.events[i].daystring);
                        tempSeriesEventsList.push(
                            global.allEvents.events[i]
                        );
                    }

                }
                else {

                }

            }
            //now go through again and add in the originals that caused the dupe.

            for (var i=0; i < tempSeriesEventsList.length; i++) {

                    if (seriesDupeDates.indexOf(tempSeriesEventsList[i].daystring)>=0) {
                        //overlappingEvents.push(tempSeriesEventsList[i]);
                        var idx = tempSeriesEventsList[i].daystring;
                        overlappingEventsIndex[idx].push(tempSeriesEventsList[i]);

                    } else {
                        eventsList.push(
                            tempSeriesEventsList[i]
                        );
                    }
            }

            for (var i in overlappingEventsIndex) {

                console.log("$$"+i);
                overlappingEvents.push(overlappingEventsIndex[i]);

            }


            console.log(overlappingEvents.length, "overlapping series count for month "+ this.props.name+" :" + Object.keys(overlappingEventsIndex).length);


        }
        if (!this.props.filterCamp) {
            //all camp
            //copy from series

        }

        return (
            <div>
                <div className="month-label one-week" id="one-week">
                    <div className="filler-with-bar">
                        <div className="month-bar"></div>
                    </div>
                    <div className="filler-with-month-name">
                        <div className="month-name">{this.props.name}</div>
                    </div>
                    <div className="filler-with-bar">
                        <div className="month-bar"></div>
                    </div>
                    <div className="filler-with-bar">
                        <div className="month-bar"></div>
                    </div>
                    <div className="filler-with-bar">
                        <div className="month-bar"></div>
                    </div>
                    <div className="filler-with-bar">
                        <div className="month-bar"></div>
                    </div>
                    <div className="filler-with-bar">
                        <div className="month-bar"></div>
                    </div>
                </div>
                <div className="grid" id={"calendar_" +this.props.name} >
                    {this.RenderWeekNames("Sun")}
                    {this.RenderWeekNames("Mon")}
                    {this.RenderWeekNames("Tue")}
                    {this.RenderWeekNames("Wed")}
                    {this.RenderWeekNames("Thu")}
                    {this.RenderWeekNames("Fri")}
                    {this.RenderWeekNames("Sat")}
                    {allDays.map((day, index) => <div className="day" key={index} > {day} </div>)}

                    {overlappingEvents.map((container, index) => <EventContainers
                        key = {index}
                        allDupes={container}
                        // thisDupe={container}
                        skipDays={this.props.skipDays}
                        // type="series"
                        // name={container[0].name}
                        month={this.props.name}
                        // price = {container[0].price}
                        // id = {container[0].id}
                        // age = {container[0].age}
                        // location = {container[0].location}
                        // spotsleft = {container[0].spotsLeft}
                        // description = {container[0].description}
                        // days = {container[0].days}
                    />)}
                    {overlappingCamp.map((container, index) => <EventContainers
                        key = {index}
                        allDupes={global.overlappingCampEvents}
                        thisDupe={container}
                        skipDays={this.props.skipDays}
                        type="camp"
                        month={this.props.name}
                        name={container.name}
                        price = {container.price}
                        id = {container.id}
                        age = {container.age}
                        location = {container.location}
                        spotsleft = {container.spotsLeft}
                        description = {container.description}
                        days = {container.days}
                    />)}
                    {eventsList.map((event, index) => <Event
                        key={index}
                        skipDays={this.props.skipDays}
                        type={event.type}
                        month={this.props.name}
                        name={event.name}
                        price = {event.price}
                        id = {event.id}
                        age = {event.age}
                        location = {event.location}
                        spotsleft = {event.spotsLeft}
                        description = {event.description}
                        days = {event.days}
                        monthObject={this}
                    />)}
                </div>
            </div>
        )

    }
}

export default Month;
