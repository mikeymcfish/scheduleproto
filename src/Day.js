import React, { Component } from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import CartIcon from './icons/CartIcon';
import $ from 'jquery';

class Day extends React.Component {
    constructor() {
        super()
    }

    renderEvent(event) {

        var colorClass="";
        switch (event.color) {
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
            <div className={"square-btn " + colorClass}>
                <div className="square-btn-copy selectable" data-modal-target="#myspecialmodal" data-name={event.name}
                     data-price={"$"+ Math.floor(Math.random()*10)}
                     data-description = {event.description}
                     data-spotsleft = {event.spotsleft}
                     data-location = {event.location}
                     data-age = {event.age}
                     data-dates = {event.dates}
                     data-type = {event.type}
                >
                    <div className={"square-btn-text " + colorClass}>{event.name}</div>
                </div>
                <div className="square-btn-additional-copy">
                    <div>{event.spotsleft} spots left</div>
                </div>
            </div>
        );

    }



    render() {


        var dropInEvents = [];
        this.props.dropinevents ? dropInEvents=this.props.dropinevents : dropInEvents=[];
        var specialEvents = [];
        this.props.specialevents ? specialEvents=this.props.specialevents.split(",") : specialEvents=[];
        var myIcon = this.props.incart ? <CartIcon/> : "";

        return (
            <div style={{width: '100%'}} data-month={this.props.month} data-dayNum={this.props.value} {...this.props}>

                <div className="day-top-container">
                    <div className="date-number">{this.props.value}
                    </div>
                    <div className="date-icon"> {myIcon}
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
