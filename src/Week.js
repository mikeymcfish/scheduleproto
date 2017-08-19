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



class Week extends React.Component {

    RenderWeekNames(i) {
        return (
            <div className="week-names">{i}</div>
        )
    }

    render() {

        var allDays = [];
        for (var i = 1; i <= this.props.skipDays; i++) {
            allDays.push(
                <div id="no-day"></div>
            );
            console.log(i);
        }

        // for (var i = 1; i <= this.props.numDays; i++) {
        //
        //
        //     var dropinevents = [];
        //     var specialevents = [];
        //     var isclosed = false;
        //     var inCart = false;
        //
        //
        //     dropinevents = this.parseForSingleDayEvents(global.allEvents.events, i, "drop-in");
        //     specialevents = this.parseForSingleDayEvents(global.allEvents.events, i, "special");
        //     isclosed = this.isDayClosed(i);
        //
        //
        //
        //     allDays.push(
        //         this.RenderDay(i, isclosed, dropinevents, specialevents, inCart)
        //     );
        //
        // }

        return (
            <div className="weekly-view">
                <StickyContainer style={{background: 'transparent'}}>

                    <Sticky>
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


                                {allDays.map((day, index) => <div className="day" key={index} > {day} </div>)}

                            }
                        }
                    </Sticky>
                    <div className="week-grid" id={"calendar_" +this.props.name} >
                        {this.RenderWeekNames("Sun")}
                        {this.RenderWeekNames("Mon")}
                        {this.RenderWeekNames("Tue")}
                        {this.RenderWeekNames("Wed")}
                        {this.RenderWeekNames("Thu")}
                        {this.RenderWeekNames("Fri")}
                        {this.RenderWeekNames("Sat")}
                    </div>
                </StickyContainer>

                {allDays.map((day, index) => <div className="day" key={index} > {day} </div>)}

            </div>

        )


    }

}

export default Week;
