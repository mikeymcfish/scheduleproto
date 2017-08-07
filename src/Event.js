import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';

class Event extends Component {


    // loadEvents(row, col) {
    //     if (this.isMounted) {
    //         this.setState({eventrow : row});
    //         this.setState({eventcol : col});
    //         //this.state = {row: row, col: col};
    //         console.log("able to print "+row+" and "+col);
    //     }
    //
    // }

    mapDate() {

    }

    constructor() {
        super();
        this.state = {eventrow: 0, eventcol: 0};
    }

    render() {

        var startCol = 2;
        var colSpan = 6;
        var startRow = 4;
        var rowSpan = 4;

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

        var days=[];
        days = this.props.days.split(",");

        //Sept skip days = 5

        startRow = 3 + Math.floor((parseInt(days[0])+5)/7);
        startCol = (parseInt(days[0])+5)%7;

        rowSpan = Math.floor((parseInt(days[1])+5)/7) - Math.floor((parseInt(days[0])+5)/7) + 1;

        console.log(startRow, startCol);


        return(

            <div className={spanType+ ' spanner selectable'} style={{

                gridColumn: "col " + startCol + " / span " + colSpan,
                gridRow: "row " + startRow + " / span " + rowSpan,
                zIndex: 100

            }}>
                <span className='label'>{this.props.name}</span>
            </div>
        )
    }
}


export default Event;
