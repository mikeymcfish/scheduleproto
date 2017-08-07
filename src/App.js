import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';

class Day extends React.Component {
    constructor() {
        super()
    }

    renderEvent(name, color) {
        var colorClass="";
        switch (color) {
            case "dropin" :
                colorClass = "drop-in-color";
                break;
            case "special" :
                colorClass = "special-color";
                break;
            default:
                break;
        }
        return(
            <div className="square-btn selectable">
                <div className="square-btn-copy">
                    <div className={"square-btn-text "+colorClass}>{name}</div>
                </div>
                <div className="sqaure-btn-additional-copy">
                    <div>More info goes here</div>
                </div>
            </div>
        );

    }

    render() {

        var dropInEvents = [];
        this.props.dropinevents ? dropInEvents=this.props.dropinevents.split(",") : dropInEvents=[];
        var specialEvents = [];
        this.props.specialevents ? specialEvents=this.props.specialevents.split(",") : specialEvents=[];
        return (
            <div style={{width: '100%'}}>

                <div className="day-top-container">
                    <div className="date-number">{this.props.value}
                    </div>
                </div>
                <div className="event-boxes">

                    {dropInEvents.map((item,i) => this.renderEvent(item, "dropin"))}
                    {specialEvents.map((item,i) => this.renderEvent(item, "special"))}

                </div>
            </div>
        );
    }
}

class Month extends React.Component {
    RenderDay(i) {
        //RANDOM TESTING
        var random1 = Math.random();
        if (random1 >.8) return <Day value={i} dropinevents="Drop-in,Tournament" specialevents="Guest Pass"/>;
        else if (random1 >.4) return <Day value={i} dropinevents="Drop-in" specialevents="Guest Pass"/>;
        else if (random1 >.2) return <Day value={i} specialevents="Guest Pass"/>;
        else return <Day value={i}/>;
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
                    {allDays.map(day => <div className="day"> {day} </div>)}
                    {this.RenderEvent("Minecraft Mobs","six-weeks", 2, 2, 2, 6)}
                    {this.RenderEvent("Spring Break","five-days", 2, 6, 3, 3)}
                </div>
            </div>
        )

    }
}

class EventsList extends Component {
    render() {
        return (
            <div className ='my-events'>
                <div className='spanner span-monday-friday camp-color camp-span-week-2 selectable'>
                    <div className='spanner-copy'> Spring Break Camp
                    </div>
                </div>
                <div className='spanner span-six-weeks series-color span-monday-2-to-5 selectable'>
                    <span className='label'>Minecraft Mobs</span>
                </div>
                <div className='spanner span-six-weeks series-color span-tuesday-3-to-5 selectable'>
                    <span className='label'>Series I</span>
                </div>
            </div>
        )
    };
}


class App extends Component {



    componentDidMount () {
         // $("#calendar").append("<div class='spanner span-monday-friday camp-color camp-span-week-2 selectable'>" +
         //     "<div class='spanner-copy'> Spring Break Camp</div></div>");
        $("#calendar").css('display','none');
        $("#calendar").css('display','grid');
        $('div:has(> #no-day)').addClass('no-day');

    }

  render() {
    return (
      <div className="App">
        {/*<MyCalendar/>*/}
        {/*<div className="App-header">*/}
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*</div>*/}
        <div className="container w-container">
              <h1 className="heading">Showing <span className="editable-heading">all</span> events for kids <span className="editable-heading">ages 7 to 9</span> in <span className="editable-heading">Brooklyn</span></h1>
              <div className="filters">
                  <div className="filter-circle-container">
                      <div className="filter-circle-filled series-color">
                      </div>
                      <div className="filter-circle-label">
                          Series
                      </div>
                  </div>
                  <div className="filter-circle-container">
                      <div className="filter-circle-filled camp-color">
                      </div>
                      <div className="filter-circle-label">
                          Camp
                      </div>
                  </div>
                  <div className="filter-circle-container">
                      <div className="filter-circle-filled drop-in-color">
                      </div>
                      <div className="filter-circle-label">
                          Drop-in
                      </div>
                  </div>
                  <div className="filter-circle-container">
                      <div className="filter-circle-empty special-color">
                      </div>
                      <div className="filter-circle-label">
                          Special
                      </div>
                  </div>
                  {/*<div className="filter-circle-check w-clearfix">*/}
                      {/*<div className="check-box series-color div-block">*/}
                          {/*<div className="check w-embed">*/}
                          {/*</div>*/}
                      {/*</div>*/}
                      {/*<div className="text text-block">Series</div>*/}
                  {/*</div>*/}
                  {/*<div className="filter-circle-check w-clearfix">*/}
                      {/*<div className="check-box drop-in-color div-block">*/}
                          {/*<div className="check w-embed">*/}
                          {/*</div>*/}
                      {/*</div>*/}
                      {/*<div className="text text-block">Drop-in</div>*/}
                  {/*</div>*/}
                  {/*<div className="filter-circle-check w-clearfix">*/}
                      {/*<div className="check-box special-color div-block">*/}
                          {/*<div className="check w-embed">*/}
                          {/*</div>*/}
                      {/*</div>*/}
                      {/*<div className="text text-block">Special</div>*/}
                  {/*</div>*/}
                  {/*<div className="filter-circle-check w-clearfix">*/}
                      {/*<div className="check-box camp-color div-block">*/}
                          {/*<div className="check w-embed">*/}
                          {/*</div>*/}
                      {/*</div>*/}
                      {/*<div className="text text-block">Camp</div>*/}
                  {/*</div>*/}
              </div>
            <Month name="September" numDays="30" skipDays="5"/>
            <Month name="October" numDays="31" skipDays="0"/>
            <Month name="November" numDays="30" skipDays="3"/>
            <Month name="December" numDays="31" skipDays="5"/>
          {/*<div className="grid" id="calendar">*/}
              {/*<div className="week-names">Sun</div>*/}
              {/*<div className="week-names">Mon</div>*/}
              {/*<div className="week-names">Tue</div>*/}
              {/*<div className="week-names">Wed</div>*/}
              {/*<div className="week-names">Thu</div>*/}
              {/*<div className="week-names">Fri</div>*/}
              {/*<div className="week-names">Sat</div>*/}

              {/*<Month/>*/}

              {/*<div className='spanner span-monday-friday camp-color camp-span-week-2 selectable'>*/}
                  {/*<div className='spanner-copy'> Spring Break Camp*/}
                  {/*</div>*/}
              {/*</div>*/}
              {/*<div className='spanner span-six-weeks series-color span-monday-2-to-5 selectable'>*/}
                  {/*<span className='label'>Minecraft Mobs</span>*/}
              {/*</div>*/}
              {/*<div className='spanner span-six-weeks series-color span-tuesday-3-to-5 selectable'>*/}
                  {/*<span className='label'>Series I</span>*/}
              {/*</div>*/}
              {/*<div className="day closed">day</div>*/}
              {/*<div className="day closed">day</div>*/}

          {/*</div>*/}
        </div>
      </div>
    );
  };

}

export default App;
