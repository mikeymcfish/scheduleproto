import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './webflow.css';

//const myThing = <div>Hello World </div>;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
                              <div className="color-4 square-btn-text">Makerspace</div>
                              <div className="repeating-tag w-hidden-medium w-hidden-small w-hidden-tiny">1/6</div>
                          </div>
                          <div className="sqaure-btn-additional-copy">
                              <div>More info goes here</div>
                          </div>
                      </div>
                      <div className="square-btn">
                          <div className="square-btn-text">Minecraft</div>
                      </div>
                      <div className="square-btn">
                          <div className="square-btn-text">Virtual Reality</div>
                          <div className="repeating-tag">1/6</div>
                      </div>
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
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="day">day</div>
              <div className="spanner span-monday-friday">
                  <div className="spanner-copy"> week of camp
                  </div>
              </div>
              <div className="spanner span-six-weeks">series</div>
          </div>
      </div>
      
    );
  }
}

export default App;
