import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';

class Event extends Component {

    constructor() {
        super();
        this.state = {count: 1};

    }

    render() {

        //check if filtered
        var hideMe = false;

        if (this.props.location.toUpperCase()!=this.props.filterLocation.toUpperCase()) hideMe=true;
        if (this.props.age=="age 7 to 9" && this.props.filterAge7to9) hideMe=true;
        if (this.props.age=="age 9 to 11" && this.props.filterAge9to11) hideMe=true;
        if (this.props.age=="age 12 to 14" && this.props.filterAge12to14) hideMe=true;

        var hiddenClass = "";
        hideMe ? hiddenClass = "hide-me" : "";

        var soldOutClass = "";
        this.props.spotsLeft<=0 ? soldOutClass="sold-out" : soldOutClass="selectable";


        //CHECK IF IN A SPAN CONTAINER

        var killFont = false;

        if (this.props.days) {


            var startCol = 1;
            var colSpan = 1;
            var startRow = 1;
            var rowSpan = 1;
            var spanType;

            switch (this.props.type) {

                case 'series' :
                    spanType = 'span-six-weeks series-color ';
                    break;
                case 'pro-series' :
                    spanType = 'span-six-weeks pro-series-color ';
                    break;
                case 'camp' :
                    spanType = 'span-monday-friday camp-color';
                    break;
                default :
                    spanType = '';
                    break;
            }

            var days = this.props.days;

            var thisMonthDays = [];

            console.log(this.props.name, this.props.month);

            if (typeof days.September != "undefined" && this.props.month == "September") {
                thisMonthDays = days.September;
            }
            else if (typeof days.October != "undefined" && this.props.month == "October") {
                thisMonthDays = days.October;
            }
            else if (typeof days.November != "undefined" && this.props.month == "November") {
                thisMonthDays = days.November;
            }
            else if (typeof days.December != "undefined" && this.props.month == "December") {
                thisMonthDays = days.December;
            }
            else if (typeof days.January != "undefined" && this.props.month == "January") {
                thisMonthDays = days.January;
            }
            else if (typeof days.February != "undefined" && this.props.month == "February") {
                thisMonthDays = days.February;
            }
            else if (typeof days.March != "undefined" && this.props.month == "March") {
                thisMonthDays = days.March;
            }
            else if (typeof days.April != "undefined" && this.props.month == "April") {
                thisMonthDays = days.April;
            }
            else if (typeof days.May != "undefined" && this.props.month == "May") {
                thisMonthDays = days.May;
            }
            else if (typeof days.June != "undefined" && this.props.month == "June") {
                thisMonthDays = days.June;
            }
            else if (typeof days.July != "undefined" && this.props.month == "July") {
                thisMonthDays = days.July;
            }
            else if (typeof days.August != "undefined" && this.props.month == "August") {
                thisMonthDays = days.August;
            }
            else {
                return(null);
            }
            //TODO ADD ALL MONTHS

            console.log("this months days are: " +thisMonthDays);

            var skipDays = parseInt(this.props.skipDays);

            startCol = $("[data-month="+this.props.month+"][data-daynum="+thisMonthDays[0]+"]")
                .parent()
                .css("grid-column-start")
                .split(" ")[0];
            startRow = $("[data-month="+this.props.month+"][data-daynum="+thisMonthDays[0]+"]")
                .parent()
                .css("grid-row-start")
                .split(" ")[0];

            console.log(startRow, startCol);


            //is it just one day??
            if (thisMonthDays.length==1) {
                colSpan = 1;
                rowSpan = 1;
                //make font smaller?
                killFont = true;
            } else {

                var endRow = $("[data-month="+this.props.month+"][data-daynum="+thisMonthDays[thisMonthDays.length-1]+"]")
                    .parent()
                    .css("grid-row-start")
                    .split(" ")[0];
                var endCol = $("[data-month="+this.props.month+"][data-daynum="+thisMonthDays[thisMonthDays.length-1]+"]")
                    .parent()
                    .css("grid-column-start")
                    .split(" ")[0];

                colSpan = endCol - startCol + 1;
                rowSpan = endRow - startRow + 1;

                // colSpan == 0 ? colSpan = 1 : colSpan = colSpan;
                // rowSpan == 0 ? rowSpan = 1 : rowSpan = rowSpan;


            }

            // startRow = 2 + Math.ceil((parseInt(days[0]) + skipDays) / 7);
            // startCol = (parseInt(days[0]) + skipDays) % 7;
            // startCol == 0 ? startCol = 7 : startCol += 0;
            //
            // rowSpan = Math.floor((parseInt(days[1]) + skipDays) / 7) - Math.floor((parseInt(days[0]) + skipDays) / 7) + 1;
            // colSpan = (parseInt(days[1]) - parseInt(days[0])) < 7 ? (parseInt(days[1]) - parseInt(days[0])) : 1;

            colSpan = this.props.type == "series" || this.props.type == "pro-series" ? colSpan : 5;
            rowSpan = this.props.type == "camp" ? 1 : rowSpan;

            console.log("spans " + this.props.type, startRow, startCol, rowSpan, colSpan);

            if (this.props.killfont) {
                killFont = true;
            }

            console.log("kill font: " + killFont);

            //does this day have an owned container?

            var hasOverlay = false;

            return (

                <div className={spanType + ' spanner ' + hiddenClass + ' ' + soldOutClass} data-days={this.props.days}
                     data-tip= {this.props.description}
                     data-modal-target="#myspecialmodal"
                     data-name={this.props.name}
                     data-price={this.props.price}
                     data-month={this.props.month}
                     data-description = {this.props.description}
                     data-spotsLeft = {this.props.spotsLeft}
                     data-location = {this.props.location}
                     data-age = {this.props.age}
                     data-dates = {this.props.dates}
                     data-type = {this.props.type}
                     data-id = {this.props.id}
                     data-startTime = {this.props.startTime}

                     style={{

                    gridColumn: "col " + startCol + " / span " + colSpan,
                    gridRow: "row " + startRow + " / span " + rowSpan,
                    zIndex: 100

                }}>
                    {(() => {
                        if (!killFont) {
                            return (
                                <span className='label'>{this.props.spotsLeft<=0?  (this.props.name + " *SOLD OUT*") : (this.props.name+ " ("+this.props.spotsLeft+" spots left)")}</span>
                            )
                        };
                    })()}
                </div>
            )

            // otherwise its a container
        } else {

            return (
                <div className={this.props.type+"-color spanner " + hiddenClass+ " "+soldOutClass+" contained-" + this.props.type}
                     data-modal-target="#myspecialmodal"
                     data-tip= {this.props.description}

                     data-name={this.props.name}
                     data-price={this.props.price}
                     data-month={this.props.month}
                     data-description = {this.props.description}
                     data-spotsLeft = {this.props.spotsLeft}
                     data-location = {this.props.location}
                     data-age = {this.props.age}
                     data-dates = {this.props.dates}
                     data-type = {this.props.type}
                     data-id = {this.props.id}
                     data-startTime = {this.props.startTime}
                >
                    {(() => {
                        if (!this.props.killfont) {
                            return (
                                <span className='label'>{this.props.spotsLeft<=0?  (this.props.name + " *SOLD OUT*") : (this.props.name+ " ("+this.props.spotsLeft+" spots left)")}</span>
                            )
                        };
                    })()}
                </div>
            )
        }
    }
}


export default Event;
