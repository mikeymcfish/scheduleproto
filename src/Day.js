import React, { Component } from 'react';
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
            <div className={"square-btn selectable " + colorClass}>
                <div className="square-btn-copy">
                    <div className={"square-btn-text " + colorClass}>{name}</div>
                </div>
                <div className="square-btn-additional-copy">
                    <div>3 spots left</div>
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
            <div style={{width: '100%'}} data-month={this.props.month} data-dayNum={this.props.value}>

                <div className="day-top-container">
                    <div className="date-number">{this.props.value}
                    </div>
                </div>
                <div className="event-boxes">

                    {dropInEvents.map((item,i) => this.renderEvent(item, "dropin"), this)}
                    {specialEvents.map((item,i) => this.renderEvent(item, "special"), this)}

                </div>
            </div>
        );
    }
}

export default Day;