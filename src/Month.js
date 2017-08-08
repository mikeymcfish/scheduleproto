import React, { Component } from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';
import Day from './Day';
import Event from './Event';


class Month extends React.Component {
    RenderDay(i, isclosed, dropinevents, specialevents) {
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

        return <Day month={this.props.name} value={i} dropinevents={dropInList} specialevents={specialList}/>

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

    render() {

        var allDays = [];
        for (var i = 1; i <= this.props.skipDays; i++) {
            allDays.push(
                <div id="no-day"></div>
            );
        }

        for (var i = 1; i <= this.props.numDays; i++) {

            console.log(i);

            var random1 = Math.random();

            //.9+ = closed
            //.7+ = two dropin
            //.6+ = one special
            //.4+ = two dropin one special
            //<.4 = none

            var dropinevents = [];
            var specialevents = [];
            var isclosed = false;

            //RANDOM TESTING

            if (random1 > .9) isclosed = true; //this breaks it. probably doesnt remove old id?
            else if (random1 > .7) dropinevents = ["makerspace", "gaming"];
            else if (random1 > .6) specialevents = ["minicamp"];
            else if (random1 > .4) { dropinevents = ["makerspace", "gaming"]; specialevents = ["minicamp"];}
            isclosed = false;

            allDays.push(
                isclosed? <div id="closed-day" i={i}></div> : this.RenderDay(i, isclosed, dropinevents, specialevents)
            );
        }

        var eventsList = [];
        if (!this.props.filterSeries) {
            //get series
            var obj = new Object;

            obj = {
                month:"September",
                days:"12,26",
                name:"Minecraft Mobs",
                type:"series",
                spanType:"six-weeks",
                skipDays: this.props.skipDays
            };
            if (this.props.name =="September") eventsList.push(
                obj
            );

            obj = new Object;
            obj = {
                month:"October",
                days:"6,27",
                name:"Virtual Reality",
                type:"series",
                spanType:"six-weeks",
                skipDays: this.props.skipDays
            }
            if (this.props.name =="October") eventsList.push(
                obj
            );
        }
        if (!this.props.filterCamp) {
            obj = new Object;
            obj = {
                month:this.props.name,
                days:"4,8",
                name:"Spring Break",
                type:"camp",
                spanType:"five-days",
                skipDays: this.props.skipDays
            }
            if (this.props.name =="September") eventsList.push(
                obj
            );
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
                    {eventsList.map((event, index) => <Event key={index} month={event.month} days={event.days} name={event.name} spanType={event.spanType} type={event.type} skipDays={event.skipDays}/>)}
                </div>
            </div>
        )

    }
}

export default Month;
