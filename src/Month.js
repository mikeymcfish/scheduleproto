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
import { StickyContainer, Sticky } from 'react-sticky';
import ReactTooltip from 'react-tooltip'



class Month extends React.Component {

    constructor() {
        super();
        global.overlappingSeriesEvents = [];
        global.overlappingCampEvents = [];
        //TODO ALL EVENTS HERE
        global.allEvents = seriesJSON;
        //TODO 'DAYSTRING' for all
        //this.parseDateListToString(global.allEvents);
    }

    componentWillUpdate() {
        global.overlappingSeriesEvents = [];
        global.overlappingCampEvents = [];

    }

    getHoliday(month, day) {
        var holidays = global.allEvents.metaData.holidays;
        for (var i = 0 ; i < Object.keys(holidays).length; i++) {
            if (holidays[i].month==month && holidays[i].day==day){
                return holidays[i];
            }
            else continue;
        }
        return null;
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

    getSeriesInDay(events, day) {

    }

    parseDateListToString(events) {

        for (var i = 0; i < Object.keys(global.allEvents.events).length; i++ ) {


            var newString = "";
            var thisEvent = global.allEvents.events[i];
            var theseDays = thisEvent.days;
            var monthNum="";
            var thisMonth;
            for (var month in theseDays) {
                switch (month) {
                    case "September" :
                        monthNum = "9";
                        thisMonth = theseDays.September;
                        break;
                    case "October" :
                        monthNum = "10";
                        thisMonth = theseDays.October;
                        break;
                    case "November" :
                        monthNum = "11";
                        thisMonth = theseDays.November;
                        break;
                    case "December" :
                        monthNum = "12";
                        thisMonth = theseDays.December;
                        break;
                    case "January" :
                        monthNum = "1";
                        thisMonth = theseDays.January;
                        break;
                    case "February" :
                        monthNum = "2";
                        thisMonth = theseDays.February;
                        break;
                    case "March" :
                        monthNum = "3";
                        thisMonth = theseDays.March;
                        break;
                    case "April" :
                        monthNum = "4";
                        thisMonth = theseDays.April;
                        break;
                    case "May" :
                        monthNum = "5";
                        thisMonth = theseDays.May;
                        break;
                    case "June" :
                        monthNum = "6";
                        thisMonth = theseDays.June;
                        break;
                    case "July" :
                        monthNum = "7";
                        thisMonth = theseDays.July;
                        break;
                    case "August" :
                        monthNum = "8";
                        thisMonth = theseDays.August;
                        break;
                    default:
                        monthNum = "FAIL";
                        thisMonth = theseDays.September;
                }
                for (var j=0; j< thisMonth.length; j++) {
                    if (newString != "") newString+=",";
                    newString+= monthNum + "-" + thisMonth[j];
                }

            }

            thisEvent.daystring = newString;

        }
    }

    //returns the single day dropinevents or special for a specific day
    parseForSingleDayEvents(allEvents, checkDay, filter) {

        var singleDayEventsThisMonth = [];
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

            if (thisMonthDays[0] == checkDay) singleDayEventsThisMonth.push(allEvents[i]);

        }
        return(singleDayEventsThisMonth);

    }

    isDayClosed (day) {

        for (var i in global.allEvents.closedDays) {

            if (this.props.name==i){
                if (global.allEvents.closedDays[i].indexOf(day)>=0) {
                    return true;
                }
            }

        }
        return false;

    }

    RenderDay(i, isclosed, dropinevents, specialevents, seriesevents, inCart) {

        //filters
        var dropInList = [];
        var seriesList = [];
        var specialList = "";
        var allList = [];
        if (isclosed) return <Day isclosed="true"/>
        if (!this.props.filterDropIn)
        {
            dropInList = dropinevents;
        }
        if (!this.props.filterSpecial)
        {
            specialList = specialevents;
        }
        if (!this.props.filterSeries)
        {
            seriesList = seriesevents;
        }



        return <Day month={this.props.name}
                    value={i}
                    dropinevents={dropInList}
                    specialevents={specialList}
                    seriesEvents={seriesList}
                    filterAge7to9={this.props.filterAge7to9}
                    filterAge9to11={this.props.filterAge9to11}
                    filterAge12to14={this.props.filterAge12to14}
                    filterLocation={this.props.filterLocation}
                    incart={inCart}/>

    }

    RenderDaySmall(i, isclosed, dropinevents, specialevents, seriesevents, proseriesevents, campevents, inCart) {

        //filters
        var dropInList = [];
        var seriesList = [];
        var proseriesList = [];
        var campList = [];
        var specialList = [];
        var allList = [];
        if (isclosed) return <Day isclosed="true"/>
        if (!this.props.filterDropIn)
        {
            dropInList = dropinevents;
        }
        if (!this.props.filterSpecial)
        {
            specialList = specialevents;
        }
        if (!this.props.filterCamp)
        {
            campList = campevents;
        }
        if (!this.props.filterSeries)
        {
            seriesList = seriesevents;
        }
        if (!this.props.filterProSeries)
        {
            proseriesList = proseriesevents;
        }

        return <Day month={this.props.name}
                    value={i}
                    dropinevents={dropInList}
                    specialevents={specialList}
                    seriesEvents={seriesList}
                    campEvents={campList}
                    filterAge7to9={this.props.filterAge7to9}
                    filterAge9to11={this.props.filterAge9to11}
                    filterAge12to14={this.props.filterAge12to14}
                    filterLocation={this.props.filterLocation}
                    incart={inCart}/>

    }


    render() {

        var allDays = [];
        for (var i = 1; i <= this.props.skipDays; i++) {
            allDays.push(
                <div id="no-day"></div>
            );
        }

        for (var i = 1; i <= this.props.numDays; i++) {

            //get events on this day
            var dropinevents = [];
            var specialevents = [];
            var seriesevents = [];
            var proseriesevents = [];
            var campevents = [];
            var isclosed = false;
            var inCart = false;

            if (this.props.events[i]) {

                for (var j=0; j<this.props.events[i].length; j++) {

                    var thisEvent = this.props.events[i][j];
                    var type = this.props.events[i][j].type;

                    switch (type) {
                        case "drop-in":
                            dropinevents.push(thisEvent);
                            break;
                        case "special":
                            specialevents.push(thisEvent);
                            break;
                        case "camp":
                            campevents.push(thisEvent);
                            break;
                        case "series":
                            seriesevents.push(thisEvent);
                            break;
                        case "dpro-series":
                            proseriesevents.push(thisEvent);
                            break;

                    }

                }
            }


            // var dropinevents = [];
            // var specialevents = [];
            // var seriesevents = [];
            // var isclosed = false;
            // var inCart = false;
            //
            //
            // dropinevents = this.parseForSingleDayEvents(global.allEvents.events, i, "drop-in");
            // specialevents = this.parseForSingleDayEvents(global.allEvents.events, i, "special");
            // seriesevents = this.getSeriesInDay(global.allEvents.events, i);
            isclosed = this.isDayClosed(i);



            allDays.push(
                this.RenderDaySmall(i, isclosed, dropinevents, specialevents, seriesevents, proseriesevents, campevents, inCart)
                // this.RenderDay(i, isclosed, dropinevents, specialevents, seriesevents, inCart)
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
            overlappingEventsIndex = [];

            //add all dupes to an array (but originals are not there yet)
            for (var i=0; i < global.allEvents.events.length; i++) {
                if (global.allEvents.events[i].type=="series" || global.allEvents.events[i].type=="pro-series") {
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

                overlappingEvents.push(overlappingEventsIndex[i]);

            }

            console.log("overlapping series count for month "+ this.props.name+" :" + Object.keys(overlappingEventsIndex).length);


        }
        if (!this.props.filterCamp) {
            //all camps
            var holdingEvents = [];
            overlappingEventsIndex = [];

            //add all dupes to an array (but originals are not there yet)
            for (var i=0; i < global.allEvents.events.length; i++) {
                if (global.allEvents.events[i].type=="camp") {
                    // global.allEvents.events[i].skipDays = this.props.skipDays;
                    if (holdingEvents.indexOf(global.allEvents.events[i].daystring)>=0) {

                        //overlappingEvents.push(global.allEvents.events[i]);
                        var idx = global.allEvents.events[i].daystring;
                        console.log(idx);
                        overlappingEventsIndex[idx] ? overlappingEventsIndex[idx] = overlappingEventsIndex[idx] : overlappingEventsIndex[idx] = [];
                        console.log(overlappingEventsIndex);
                        overlappingEventsIndex[idx].push(global.allEvents.events[i]);
                        campDupeDates.push(global.allEvents.events[i].daystring);

                    } else{
                        holdingEvents.push(global.allEvents.events[i].daystring);
                        tempCampEventsList.push(
                            global.allEvents.events[i]
                        );
                    }

                }
                else {

                }

            }
            //now go through again and add in the originals that caused the dupe.

            for (var i=0; i < tempCampEventsList.length; i++) {

                if (campDupeDates.indexOf(tempCampEventsList[i].daystring)>=0) {
                    //overlappingEvents.push(tempCampEventsList[i]);
                    var idx = tempCampEventsList[i].daystring;
                    overlappingEventsIndex[idx].push(tempCampEventsList[i]);

                } else {
                    eventsList.push(
                        tempCampEventsList[i]
                    );
                }
            }

            for (var i in overlappingEventsIndex) {

                overlappingCamp.push(overlappingEventsIndex[i]);

            }

            console.log("overlapping camp count for month "+ this.props.name+" :" + Object.keys(overlappingEventsIndex).length);


        }

        return (
            <div className="monthly-view">
                <StickyContainer style={{ background:'transparent'}}>

                    <Sticky >
                        {
                            ({
                                 style,
                                 isSticky,
                                 wasSticky,
                                 distanceFromTop,
                                 distanceFromBottom,
                                 calculatedHeight
                             }) => {
                                //console.log({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight });

                                return (
                                    <div className="month-label one-week" style={style}>
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
                                )
                            }
                        }
                    </Sticky>


                <div className="grid" id={"year-calendar_" +this.props.name} >
                    {this.RenderWeekNames("Sun")}
                    {this.RenderWeekNames("Mon")}
                    {this.RenderWeekNames("Tue")}
                    {this.RenderWeekNames("Wed")}
                    {this.RenderWeekNames("Thu")}
                    {this.RenderWeekNames("Fri")}
                    {this.RenderWeekNames("Sat")}
                    {allDays.map((day, index) => <div className="day" key={index} > {day} </div>)}

                    {/*{overlappingEvents.map((container, index) => <EventContainers*/}
                        {/*key = {index}*/}
                        {/*allDupes={container}*/}
                        {/*skipDays={this.props.skipDays}*/}
                        {/*month={this.props.name}*/}
                        {/*filterAge7to9={this.props.filterAge7to9}*/}
                        {/*filterAge9to11={this.props.filterAge9to11}*/}
                        {/*filterAge12to14={this.props.filterAge12to14}*/}
                        {/*filterLocation={this.props.filterLocation}*/}
                    {/*/>)}*/}
                    {/*{overlappingCamp.map((container, index) => <EventContainers*/}
                        {/*key = {index}*/}
                        {/*allDupes={container}*/}
                        {/*skipDays={this.props.skipDays}*/}
                        {/*month={this.props.name}*/}
                        {/*filterAge7to9={this.props.filterAge7to9}*/}
                        {/*filterAge9to11={this.props.filterAge9to11}*/}
                        {/*filterAge12to14={this.props.filterAge12to14}*/}
                        {/*filterLocation={this.props.filterLocation}*/}
                    {/*/>)}*/}
                    {/*{eventsList.map((event, index) => <Event*/}
                        {/*key={index}*/}
                        {/*skipDays={this.props.skipDays}*/}
                        {/*type={event.type}*/}
                        {/*month={this.props.name}*/}
                        {/*name={event.name}*/}
                        {/*price = {event.price}*/}
                        {/*id = {event.id}*/}
                        {/*age = {event.age}*/}
                        {/*location = {event.location}*/}
                        {/*spotsLeft = {event.spotsLeft}*/}
                        {/*description = {event.description}*/}
                        {/*days = {event.days}*/}
                        {/*startTime = {event.startTime}*/}
                        {/*filterAge7to9={this.props.filterAge7to9}*/}
                        {/*filterAge9to11={this.props.filterAge9to11}*/}
                        {/*filterAge12to14={this.props.filterAge12to14}*/}
                        {/*filterLocation={this.props.filterLocation}*/}
                        {/*monthObject={this}*/}
                    {/*/>)}*/}
                </div>
                </StickyContainer>

            </div>
        )

    }
}

export default Month;
