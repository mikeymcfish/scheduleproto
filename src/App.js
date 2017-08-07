import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';


import BigCalendar from 'react-big-calendar';
import moment from 'moment';
// import events from './events';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
// BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
//
// const MyCalendar = props => (
//     <div>
//         <BigCalendar
//             events={events}
//             toolbar = 'false'
//             views = 'month'
//             startAccessor='startDate'
//             endAccessor='endDate'
//             defaultDate={new Date(2017, 3, 1)}
//
//         />
//     </div>
// );

//testing


const daysInMonth = [];

for (var i = 1;i<31;i++) {
    daysInMonth.push(i);
}

var daysList = daysInMonth.map((day,i) =>

            <div className="day">

                    <div className="day-top-container">
                        <div className="date-number">{day}
                            {(() => {
                                if (i%2==0)
                                    return "*";
                            })()}
                                </div>
                    </div>
                    <div className="event-boxes">
                        <div className="square-btn selectable">
                            <div className="square-btn-copy">
                                <div className="square-btn-text drop-in-color">Drop-in</div>
                            </div>
                            <div className="sqaure-btn-additional-copy">
                                <div>More info goes here</div>
                            </div>
                        </div>
                        <div className="square-btn selectable">
                            <div className="square-btn-copy">
                                <div className="square-btn-text special-color">Guest Pass</div>
                            </div>
                            <div className="sqaure-btn-additional-copy">
                                <div>More info goes here</div>
                            </div>
                        </div>
                    </div>
            </div>
        //</div>

);



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
          <div className="grid" id="calendar">
              <div className="week-names">Sun</div>
              <div className="week-names monday">Mon</div>
              <div className="week-names">Tue</div>
              <div className="week-names">Wed</div>
              <div className="week-names">Thu</div>
              <div className="week-names">Fri</div>
              <div className="week-names">Sat</div>

              {daysList}

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
              <div className="day closed">day</div>
              <div className="day closed">day</div>

          </div>
      </div>
      </div>
    );
  };

}

export default App;
