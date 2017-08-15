import React, { Component } from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import CartIcon from './icons/CartIcon';
import $ from 'jquery';
import mineconimage from './img/minecon.png';

import ReactHint from 'react-hint'
import 'react-hint/css/index.css'

class Day extends React.Component {
    constructor() {
        super()
    }

    renderEvent(event) {

        //console.log(this.props.filterAge7to9, event.age);

        var hideMe = false;

        if (event.location.toUpperCase()!=this.props.filterLocation.toUpperCase()) hideMe=true;
        if (event.age=="age 7 to 9" && this.props.filterAge7to9) hideMe=true;
        if (event.age=="age 9 to 11" && this.props.filterAge9to11) hideMe=true;
        if (event.age=="age 12 to 14" && this.props.filterAge12to14) hideMe=true;

        var colorClass="";
        switch (event.type) {
            case "drop-in" :
                colorClass = "drop-in-color";
                break;
            case "special" :
                colorClass = "special-color";
                break;
            case "camp" :
                colorClass = "camp-color";
                break;
            default:
                break;
        }
        var hiddenClass = "";
        hideMe ? hiddenClass = "hide-me" : "";
        var soldOutClass = "";
        event.spotsLeft<=0 ? soldOutClass="sold-out" : soldOutClass="selectable";
        return(
            <div className={"square-btn " + colorClass + " " + hiddenClass}>
                <div className={"square-btn-copy " + soldOutClass}  data-modal-target="#myspecialmodal" data-name={event.name}
                     data-price={event.price}
                     data-description = {event.description}
                     data-spotsLeft = {event.spotsLeft}
                     data-location = {event.location}
                     data-age = {event.age}
                     data-dates = {event.dates}
                     data-type = {event.type}
                     data-id = {event.id}
                     data-startTime = {event.startTime}
                >
                    <div className={"square-btn-text " + colorClass}>{event.name}</div>
                </div>
                <div className="square-btn-additional-copy">
                    {event.spotsLeft<=0 ?
                        <div>SOLD OUT</div>
                        :
                        <div>{event.spotsLeft} spots left</div>
                    }

                </div>
            </div>
        );

    }



    render() {

        // if (this.props.minecon=="true") {
        //
        //     return (
        //         <div className="minecon" style={{width: '100%'}} data-month={this.props.month} data-dayNum={this.props.value}
        //              style={{
        //                  backgroundImage: "url('./img/minecon.png')"
        //              }}
        //              {...this.props}>
        //         </div>
        //     );
        // }



        var dropInEvents = [];
        this.props.dropinevents ? dropInEvents=this.props.dropinevents : dropInEvents=[];
        var specialEvents = [];
        this.props.specialevents ? specialEvents=this.props.specialevents : specialEvents=[];
        var myIcon = this.props.incart ? <CartIcon/> : "";
        if (this.props.isclosed=="true") {
            return(
                    <div style={{width: '100%'}} data-month={this.props.month} data-dayNum={this.props.value} className="close-me">

                        <div className="day-top-container">
                            <div className="date-number">{this.props.value}
                            </div>
                            <div className="date-icon"> {myIcon}
                            </div>
                        </div>
                    </div>
            )
        }

        return (
            <div style={{width: '100%'}} data-month={this.props.month} data-dayNum={this.props.value}>

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
