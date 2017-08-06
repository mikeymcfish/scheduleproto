import React, { Component } from 'react';
import logo from './logo.svg';
import './webflow.css';
import './App.css';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const MyCalendar = props => (
    <div>
        <BigCalendar
            events={events}
            toolbar = 'false'
            views = 'month'
            startAccessor='startDate'
            endAccessor='endDate'
            defaultDate={new Date(2017, 3, 1)}

        />
    </div>
);

//const myThing = <div>Hello World </div>;

class App extends Component {
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
                  <div className="filter-circle-check w-clearfix">
                      <div className="check-box series-color div-block">
                          <div className="check w-embed">
                          </div>
                      </div>
                      <div className="text text-block">Series</div>
                  </div>
                  <div className="filter-circle-check w-clearfix">
                      <div className="check-box drop-in-color div-block">
                          <div className="check w-embed">
                          </div>
                      </div>
                      <div className="text text-block">Drop-in</div>
                  </div>
                  <div className="filter-circle-check w-clearfix">
                      <div className="check-box special-color div-block">
                          <div className="check w-embed">
                          </div>
                      </div>
                      <div className="text text-block">Special</div>
                  </div>
                  <div className="filter-circle-check w-clearfix">
                      <div className="check-box camp-color div-block">
                          <div className="check w-embed">
                          </div>
                      </div>
                      <div className="text text-block">Camp</div>
                  </div>
              </div>
          <div className="month-label one-week" id="one-week">
              <div className="filler-with-bar">
                  <div className="month-bar"></div>
              </div>
              <div className="filler-with-month-name">
                  <div className="month-name">September</div>
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
          <div className="grid">
              <div className="week-names">Sun</div>
              <div className="week-names monday">Mon</div>
              <div className="week-names">Tue</div>
              <div className="week-names">Wed</div>
              <div className="week-names">Thu</div>
              <div className="week-names">Fri</div>
              <div className="week-names">Sat</div>
              <div className="day">
                  <div className="day-top-container">
                    <div className="date-number">1</div>
                    <div className="date-icon">X</div>
                  </div>
                  <div className="event-boxes">
                      <div className="square-btn">
                          <div className="square-btn-copy">
                              <div className="square-btn-text drop-in-color">Drop-in</div>
                              {/*<div className="repeating-tag w-hidden-medium w-hidden-small w-hidden-tiny">1/6</div>*/}
                          </div>
                          <div className="sqaure-btn-additional-copy">
                              <div>More info goes here</div>
                          </div>
                      </div>
                      {/*<div className="square-btn">*/}
                          {/*<div className="square-btn-copy">*/}
                              {/*<div className="square-btn-text">Makerspace</div>*/}
                              {/*/!*<div className="repeating-tag w-hidden-medium w-hidden-small w-hidden-tiny">1/6</div>*!/*/}
                          {/*</div>*/}
                          {/*<div className="sqaure-btn-additional-copy">*/}
                              {/*<div>More info goes here</div>*/}
                          {/*</div>*/}
                      {/*</div>*/}
                      {/*<div className="square-btn">*/}
                          {/*<div className="square-btn-copy">*/}
                              {/*<div className="square-btn-text">Makerspace</div>*/}
                              {/*/!*<div className="repeating-tag w-hidden-medium w-hidden-small w-hidden-tiny">1/6</div>*!/*/}
                          {/*</div>*/}
                          {/*<div className="sqaure-btn-additional-copy">*/}
                              {/*<div>More info goes here</div>*/}
                          {/*</div>*/}
                      {/*</div>*/}
                      {/*<div className="square-btn">*/}
                          {/*<div className="square-btn-text">Minecraft</div>*/}
                      {/*</div>*/}
                      {/*<div className="square-btn">*/}
                          {/*<div className="square-btn-text">Virtual Reality</div>*/}
                          {/*<div className="repeating-tag">1/6</div>*/}
                      {/*</div>*/}
                  </div>
              </div>
              <div className="day">
                  <div className="day-top-container">
                      <div className="date-number">1</div>
                      <div className="date-icon">X</div>
                  </div>
                  <div className="event-boxes">
                      <div className="square-btn drop-in-color">
                          <div className="square-btn-copy">
                              <div className="square-btn-text  drop-in-color">Drop-in</div>
                              {/*<div className="repeating-tag w-hidden-medium w-hidden-small w-hidden-tiny">1/6</div>*/}
                          </div>
                          <div className="sqaure-btn-additional-copy">
                              <div>More info goes here</div>
                          </div>
                      </div>
                      <div className="and-more-label">...and 2 others</div>

                      {/*<div className="square-btn">*/}
                      {/*<div className="square-btn-copy">*/}
                      {/*<div className="square-btn-text">Makerspace</div>*/}
                      {/*/!*<div className="repeating-tag w-hidden-medium w-hidden-small w-hidden-tiny">1/6</div>*!/*/}
                      {/*</div>*/}
                      {/*<div className="sqaure-btn-additional-copy">*/}
                      {/*<div>More info goes here</div>*/}
                      {/*</div>*/}
                      {/*</div>*/}
                      {/*<div className="square-btn">*/}
                      {/*<div className="square-btn-copy">*/}
                      {/*<div className="square-btn-text">Makerspace</div>*/}
                      {/*/!*<div className="repeating-tag w-hidden-medium w-hidden-small w-hidden-tiny">1/6</div>*!/*/}
                      {/*</div>*/}
                      {/*<div className="sqaure-btn-additional-copy">*/}
                      {/*<div>More info goes here</div>*/}
                      {/*</div>*/}
                      {/*</div>*/}
                      {/*<div className="square-btn">*/}
                      {/*<div className="square-btn-text">Minecraft</div>*/}
                      {/*</div>*/}
                      {/*<div className="square-btn">*/}
                      {/*<div className="square-btn-text">Virtual Reality</div>*/}
                      {/*<div className="repeating-tag">1/6</div>*/}
                      {/*</div>*/}
                  </div>
              </div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day closed">day</div>
              <div className="day closed">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>

              <div className="spanner span-monday-friday camp-color">
                  <div className="spanner-copy"> week of camp
                  </div>
              </div>
              <div className="spanner span-six-weeks series-color">
                  <span className="label">series</span>
              </div>
          </div>
      </div>
      </div>
    );
  }
}

export default App;
