import React, { Component } from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';
import Day from './Day';
import Event from './Event';
import EventContainers from "./EventContainer";


class Month extends React.Component {
    RenderDay(i, isclosed, dropinevents, specialevents, inCart) {

        //Hold up, is this a super special day?

        if (this.props.name=="November" && i==18) {
            //minecon
            return <Day closed="true" minecon="true"/>

        }


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

    componentDidMount() {


    }

    componentWillUpdate() {
        global.overlappingSeriesEvents = [];
        global.overlappingCampEvents = [];

    }


    getGridRow(date) {
        return $('[data-month="September"][data-dayNum="'+date+'"').parent().css("grid-row");
    }
    getGridCol(date) {
        return $('[data-month="September"][data-dayNum="'+date+'"').parent().css("grid-column");
    }
    constructor() {
        super();
        global.overlappingSeriesEvents = [];
        global.overlappingCampEvents = [];
        //LOAD ALL EVENTS HERE
        global.allEvents =
            {
                events : [
                    {
                        month:"September",
                        days:"12,26",
                        name:"Minecraft Mobs",
                        type:"series",
                        spanType:"six-weeks",
                        price: 3.95,
                        id: 1,
                        description: "ashfdnsdn dsojf kdnfo sjndlnsdfo lsdkj odsnf jsdnfj sdnsdnf lsdnlsd nkjdfsnds",
                        doesOwn: false,
                        location: "Brooklyn",
                        spotsLeft: 2,
                        age: "7-9"
                    },
                    {
                        month:"October",
                        days:"4,25",
                        name:"Virtual Reality",
                        type:"series",
                        spanType:"six-weeks",
                        price: 3.95,
                        id: 1,
                        description: "ashfdnsdn dsojf kdnfo sjndlnsdfo lsdkj odsnf jsdnfj sdnsdnf lsdnlsd nkjdfsnds",
                        doesOwn: false,
                        location: "Brooklyn",
                        spotsLeft: 1,
                        age: "7-9"
                    },
                    {
                        month:"October",
                        days:"4,25",
                        name:"Overlapping Event",
                        type:"series",
                        spanType:"six-weeks",
                        price: 3.95,
                        id: 1,
                        description: "ashfdnsdn dsojf kdnfo sjndlnsdfo lsdkj odsnf jsdnfj sdnsdnf lsdnlsd nkjdfsnds",
                        doesOwn: false,
                        location: "Brooklyn",
                        spotsLeft: 0,
                        age: "7-9"
                    },
                    {
                        month:"September",
                        days:"2,14",
                        name:"Minecraft Mobs",
                        type:"series",
                        spanType:"six-weeks",
                        price: 3.95,
                        id: 1,
                        description: "ashfdnsdn dsojf kdnfo sjndlnsdfo lsdkj odsnf jsdnfj sdnsdnf lsdnlsd nkjdfsnds",
                        doesOwn: false,
                        location: "Brooklyn",
                        spotsLeft: 3,
                        age: "7-9"
                    },
                    {
                        month:"September",
                        days:"11,15",
                        name:"Spring Break",
                        type:"camp",
                        spanType:"five-days",
                        price: 13.95,
                        id: 1,
                        description: "ashfdnsdn dsojf kdnfo sjndlnsdfo lsdkj odsnf jsdnfj sdnsdnf lsdnlsd nkjdfsnds",
                        doesOwn: false,
                        location: "Brooklyn",
                        spotsLeft: 4,
                        age: "7-9"
                    },
                    {
                        month:"September",
                        days:"11,15",
                        name:"Other Camp Option",
                        type:"camp",
                        spanType:"five-days",
                        price: 3.95,
                        id: 1,
                        description: "ashfdnsdn dsojf kdnfo sjndlnsdfo lsdkj odsnf jsdnfj sdnsdnf lsdnlsd nkjdfsnds",
                        doesOwn: false,
                        location: "Brooklyn",
                        spotsLeft: 2,
                        age: "7-9"
                    },
                    {
                        month:"September",
                        days:"18,22",
                        name:"Booger camp",
                        type:"camp",
                        spanType:"five-days",
                        price: 113.95,
                        id: 1,
                        description: "ashfdnsdn dsojf kdnfo sjndlnsdfo lsdkj odsnf jsdnfj sdnsdnf lsdnlsd nkjdfsnds",
                        doesOwn: true,
                        location: "Brooklyn",
                        spotsLeft: 2,
                        age: "7-9"
                    },
                    {
                        month:"September",
                        days:"12,26",
                        name:"September Overlap",
                        type:"series",
                        spanType:"six-weeks",
                        price: 13.95,
                        id: 1,
                        description: "ashfdnsdn dsojf kdnfo sjndlnsdfo lsdkj odsnf jsdnfj sdnsdnf lsdnlsd nkjdfsnds",
                        doesOwn: false,
                        location: "Brooklyn",
                        spotsLeft: 1,
                        age: "7-9"
                    }

                ]
            }
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

            //RANDOM TESTING

            var dropInEvent = {
                month:"September",
                days:"18",
                name:"Makerspace",
                type:"drop-in",
                price:"$55",
                spotsleft:"3",
                id: 1,
                age: "7-9",
                location: "Brooklyn",
                doesOwn: false,
                description: "sdjnksdjnf lskdnf kjsdnf djsnf skjdbfjhdsbv jdbfjhsdbfjbfj  dfbkdfbgkjdfbg dkfbkdb dkfb sdfkbfdk."
            };
            var specialEvent = {
                month:"September",
                days:"18",
                name:"Tournament",
                type:"special",
                price:"$155",
                spotsleft:"2",
                id: 1,
                age: "9-11",
                location: "Brooklyn",
                doesOwn: false,
                description: "sdjnksdjnf lskdnf kjsdnf djsnf skjdbfjhdsbv jdbfjhsdbfjbfj  dfbkdfbgkjdfbg dkfbkdb dkfb sdfkbfdk."
            };

            if (i%4==0) isclosed = true; //this breaks it. probably doesnt remove old id?
            else if (i%4==1) dropinevents.push(dropInEvent);
            else if (i%4==2) specialevents.push(specialEvent);
            else if (i%4==2) {
                dropinevents.push(dropInEvent);
                specialevents.push(specialEvent);
                inCart = true;
            }
            // else if (i%4==2) specialevents = ["minicamp"];
            // else if (i%4==3) { dropinevents = ["makerspace", "gaming"]; specialevents = ["minicamp"]; inCart = true;}

            allDays.push(
                isclosed? <div id="closed-day" i={i}></div> : this.RenderDay(i, isclosed, dropinevents, specialevents, inCart)
            );
        }

        var eventsList = [];
        var tempSeriesEventsList = [];
        var tempCampEventsList = [];

        var seriesDupeDates = [];
        var campDupeDates = [];


        if (!this.props.filterSeries) {
            //all series
            var holdingEvents = [];

            //add all dupes to an array (but originals are not there yet)
            for (var i=0; i < global.allEvents.events.length; i++) {
                if (global.allEvents.events[i].month == this.props.name && global.allEvents.events[i].type=="series") {
                    global.allEvents.events[i].skipDays =  this.props.skipDays;
                    if (holdingEvents.indexOf(global.allEvents.events[i].days)>=0) {

                        global.overlappingSeriesEvents.push(global.allEvents.events[i]);
                        seriesDupeDates.push(global.allEvents.events[i].days);

                    } else{
                        holdingEvents.push(global.allEvents.events[i].days);
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

                    if (seriesDupeDates.indexOf(tempSeriesEventsList[i].days)>=0) {

                        global.overlappingSeriesEvents.push(tempSeriesEventsList[i]);

                    } else{
                        eventsList.push(
                            tempSeriesEventsList[i]
                        );
                    }
            }
            console.log("overlapping series count for month "+ this.props.name+" :" + global.overlappingSeriesEvents.length)


        }
        if (!this.props.filterCamp) {
            //all camp
            //all series
            var holdingEvents = [];


            //add all dupes to an array (but originals are not there yet)
            for (var i=0; i < global.allEvents.events.length; i++) {
                if (global.allEvents.events[i].month == this.props.name && global.allEvents.events[i].type=="camp") {
                    global.allEvents.events[i].skipDays =  this.props.skipDays;
                    if (holdingEvents.indexOf(global.allEvents.events[i].days)>=0) {

                        global.overlappingCampEvents.push(global.allEvents.events[i]);
                        campDupeDates.push(global.allEvents.events[i].days);

                    } else{
                        holdingEvents.push(global.allEvents.events[i].days);
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

                if (campDupeDates.indexOf(tempCampEventsList[i].days)>=0) {

                    global.overlappingCampEvents.push(tempCampEventsList[i]);

                } else{
                    eventsList.push(
                        tempCampEventsList[i]
                    );
                }
            }






            console.log("overlapping events count for month "+ this.props.name+" :" + global.overlappingCampEvents.length)


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

                    {seriesDupeDates.map((container, index) => <EventContainers
                        allDupes={global.overlappingSeriesEvents}
                        thisDupe={container}
                        skipDays={this.props.skipDays}
                        type="series"
                        month={container.month}
                        name={container.name}
                        price = {container.price}
                        id = {container.id}
                        age = {container.age}
                        location = {container.location}
                        spotsleft = {container.spotsLeft}
                        description = {container.description}
                    />)}
                    {campDupeDates.map((container, index) => <EventContainers
                        allDupes={global.overlappingCampEvents}
                        thisDupe={container}
                        skipDays={this.props.skipDays}
                        type="camp"
                        month={container.month}
                        name={container.name}
                        price = {container.price}
                        id = {container.id}
                        age = {container.age}
                        location = {container.location}
                        spotsleft = {container.spotsLeft}
                        description = {container.description}
                    />)}
                    {eventsList.map((event, index) => <Event
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
                        days = {event.days}
                        monthObject={this}
                    />)}
                </div>
            </div>
        )

    }
}

export default Month;
