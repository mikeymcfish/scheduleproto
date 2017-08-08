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
        //filters
        var dropInList = "";
        var specialList = "";
        if (isclosed) return <Day closed="true"/>
        if (!this.props.filterDropIn)
        {
            dropInList = dropinevents.toString();
        }
        if (!this.props.filterSpecial)
        {
            specialList = specialevents.toString();
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

        // var Ev = new Event();
        // var dayNum = 5;
        // Ev.loadEvents(this.getGridRow(5), this.getGridCol(5));
    }

    getGridRow(date) {
        return $('[data-month="September"][data-dayNum="'+date+'"').parent().css("grid-row");
    }
    getGridCol(date) {
        return $('[data-month="September"][data-dayNum="'+date+'"').parent().css("grid-column");
    }
    constructor() {
        super();
        global.overlappingEvents = [];
        //LOAD ALL EVENTS HERE
        global.allEvents =
            {
                events : [
                    {
                        month:"September",
                        days:"12,26",
                        name:"Minecraft Mobs",
                        type:"series",
                        spanType:"six-weeks"
                    },
                    {
                        month:"October",
                        days:"4,25",
                        name:"Virtual Reality",
                        type:"series",
                        spanType:"six-weeks"
                    },
                    {
                        month:"October",
                        days:"4,25",
                        name:"Overlapping Event",
                        type:"series",
                        spanType:"six-weeks"
                    },
                    {
                        month:"September",
                        days:"2,14",
                        name:"Minecraft Mobs",
                        type:"series",
                        spanType:"six-weeks"
                    },
                    {
                        month:"September",
                        days:"11,15",
                        name:"Spring Break",
                        type:"camp",
                        spanType:"five-days"
                    },
                    {
                        month:"September",
                        days:"12,26",
                        name:"September Overlap",
                        type:"series",
                        spanType:"six-weeks"
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
            if (i%4==0) isclosed = true; //this breaks it. probably doesnt remove old id?
            else if (i%4==1) dropinevents = ["makerspace", "gaming"];
            else if (i%4==2) specialevents = ["minicamp"];
            else if (i%4==3) { dropinevents = ["makerspace", "gaming"]; specialevents = ["minicamp"]; inCart = true;}

            allDays.push(
                isclosed? <div id="closed-day" i={i}></div> : this.RenderDay(i, isclosed, dropinevents, specialevents, inCart)
            );
        }

        var eventsList = [];
        var tempEventsList = [];
        var seriesDupeDates = [];
        if (!this.props.filterSeries) {
            //all series
            var holdingEvents = [];

            //add all dupes to an array (but originals are not there yet)
            for (var i=0; i < global.allEvents.events.length; i++) {
                if (global.allEvents.events[i].month == this.props.name && global.allEvents.events[i].type=="series") {
                    global.allEvents.events[i].skipDays =  this.props.skipDays;
                    if (holdingEvents.indexOf(global.allEvents.events[i].days)>=0) {

                        global.overlappingEvents.push(global.allEvents.events[i]);
                        seriesDupeDates.push(global.allEvents.events[i].days);

                    } else{
                        holdingEvents.push(global.allEvents.events[i].days);
                        tempEventsList.push(
                            global.allEvents.events[i]
                        );
                    }

                }
                else {

                }
            }
            //now go through again and add in the originals that caused the dupe.
            for (var i=0; i < tempEventsList.length; i++) {

                    if (seriesDupeDates.indexOf(tempEventsList[i].days)>=0) {

                        global.overlappingEvents.push(tempEventsList[i]);

                    } else{
                        eventsList.push(
                            tempEventsList[i]
                        );
                    }


            }



            console.log("overlapping events count for month "+ this.props.name+" :" + global.overlappingEvents.length)


        }
        if (!this.props.filterCamp) {
            //all camp
            for (var i=0; i < global.allEvents.events.length; i++) {
                if (global.allEvents.events[i].month == this.props.name && global.allEvents.events[i].type=="camp") {
                    global.allEvents.events[i].skipDays =  this.props.skipDays
                    eventsList.push(
                        global.allEvents.events[i]
                    );
                }
            }
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
                    {seriesDupeDates.map((container, index) => <EventContainers thisDupe={container} skipDays={this.props.skipDays} type="series"/>)}
                    {eventsList.map((event, index) => <Event key={index} month={event.month} days={event.days} name={event.name} spanType={event.spanType} type={event.type} skipDays={event.skipDays} monthObject={this}/>)}
                </div>
            </div>
        )

    }
}

export default Month;
