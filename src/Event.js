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

        //CHECK IF IN A SPAN CONTAINER


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
                case 'camp' :
                    spanType = 'span-monday-friday camp-color';
                    break;
                default :
                    spanType = '';
                    break;
            }

            var days = this.props.days;

            var thisMonthDays = [];

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

            var killFont = false;
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

            colSpan = this.props.type == "series" ? colSpan : 5;
            rowSpan = this.props.type == "camp" ? 1 : rowSpan;

            console.log("spans " + this.props.type, startRow, startCol, rowSpan, colSpan);

            return (

                <div className={spanType + ' spanner selectable'} data-days={this.props.days}
                     data-modal-target="#myspecialmodal"
                     data-name={this.props.name}
                     data-price={this.props.price}
                     data-month={this.props.month}
                     data-description = {this.props.description}
                     data-spotsleft = {this.props.spotsleft}
                     data-location = {this.props.location}
                     data-age = {this.props.age}
                     data-dates = {this.props.dates}
                     data-type = {this.props.type}
                     data-id = {this.props.id}

                     style={{

                    gridColumn: "col " + startCol + " / span " + colSpan,
                    gridRow: "row " + startRow + " / span " + rowSpan,
                    zIndex: 100

                }}>
                    {(() => {
                        if (!killFont) {
                            return (
                                <span className='label'>{this.props.name}</span>
                            )
                        };
                    })()}
                </div>
            )
        } else {
            return (
                <div className={this.props.type+"-color spanner selectable contained-" + this.props.type}
                     data-modal-target="#myspecialmodal"
                     data-name={this.props.name}
                     data-price={this.props.price}
                     data-month={this.props.month}
                     data-description = {this.props.description}
                     data-spotsleft = {this.props.spotsleft}
                     data-location = {this.props.location}
                     data-age = {this.props.age}
                     data-dates = {this.props.dates}
                     data-type = {this.props.type}
                     data-id = {this.props.id}
                >
                    <span className='label'>{this.props.name}</span>
                </div>
            )
        }
    }
}


export default Event;
