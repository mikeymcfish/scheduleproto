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

            switch (this.props.spanType) {

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

            var days = [];
            days = this.props.days.split(",");

            var skipDays = parseInt(this.props.skipDays);

            startRow = 2 + Math.ceil((parseInt(days[0]) + skipDays) / 7);
            startCol = (parseInt(days[0]) + skipDays) % 7;
            startCol == 0 ? startCol = 7 : startCol += 0;

            rowSpan = Math.floor((parseInt(days[1]) + skipDays) / 7) - Math.floor((parseInt(days[0]) + skipDays) / 7) + 1;
            colSpan = (parseInt(days[1]) - parseInt(days[0])) < 7 ? (parseInt(days[1]) - parseInt(days[0])) : 1;

            colSpan = this.props.type == "series" ? colSpan : 5;
            rowSpan = this.props.type == "camp" ? 1 : rowSpan;

            console.log("spans " + this.props.type, startRow, startCol, rowSpan, colSpan);

            return (

                <div className={spanType + ' spanner selectable'} data-days={this.props.days}
                     data-modal-target="#myspecialmodal" data-name={this.props.name} data-price={"$"+ Math.floor(Math.random()*10)}
                     data-month={this.props.month}
                     data-description = {this.props.description}
                     data-spotsleft = {this.props.spotsleft}
                     data-location = {this.props.location}
                     data-age = {this.props.age}
                     data-dates = {this.props.dates}
                     data-type = {this.props.type}

                     style={{

                    gridColumn: "col " + startCol + " / span " + colSpan,
                    gridRow: "row " + startRow + " / span " + rowSpan,
                    zIndex: 100

                }}>
                    <span className='label'>{this.props.name}</span>
                </div>
            )
        } else {
            return (
                <div className={this.props.type+"-color spanner selectable contained-" + this.props.type}
                     data-modal-target="#myspecialmodal" data-name={this.props.name} data-price={"$"+ Math.floor(Math.random()*10)}
                     data-month={this.props.month}
                     data-description = {this.props.description}
                     data-spotsleft = {this.props.spotsleft}
                     data-location = {this.props.location}
                     data-age = {this.props.age}
                     data-dates = {this.props.dates}
                >
                    <span className='label'>{this.props.name}</span>
                </div>
            )
        }
    }
}


export default Event;
