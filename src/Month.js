import React, { Component } from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';
import Day from './Day';
import Event from './Event';


class Month extends React.Component {
    RenderDay(i) {
        //RANDOM TESTING
        var random1 = Math.random();
        if (random1 >.8) return <Day month={this.props.name} value={i} dropinevents="Makerspace,Tournament" specialevents="Guest Pass"/>;
        else if (random1 >.4) return <Day month={this.props.name}  value={i} dropinevents="Makerspace" specialevents="Guest Pass"/>;
        else if (random1 >.2) return <Day month={this.props.name}  value={i} specialevents="Guest Pass"/>;
        else return <Day month={this.props.name}  value={i}/>;
        //
    }

    RenderAllDays(c) {

        var allDays = [];

        for (var i = 1; i < c; i++) {
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
            allDays.push(
                this.RenderDay(i)
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
                    {this.RenderWeekNames("Sunday")}
                    {this.RenderWeekNames("Monday")}
                    {this.RenderWeekNames("Tuesday")}
                    {this.RenderWeekNames("Wednesday")}
                    {this.RenderWeekNames("Thursday")}
                    {this.RenderWeekNames("Friday")}
                    {this.RenderWeekNames("Saturday")}
                    {allDays.map((day, index) => <div className="day" key={index} > {day} </div>)}
                    <Event month={this} days="12,26" name="Minecraft Mobs" spanType="six-weeks"/>
                    {/*{this.RenderEvent("Minecraft Mobs","six-weeks", 2, 2, 4, 6)}*/}
                    {/*{this.RenderEvent("Spring Break","five-days", 2, 5, 3, 3)}*/}
                </div>
            </div>
        )

    }
}

export default Month;
