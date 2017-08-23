import React, { Component } from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import CartIcon from './icons/CartIcon';
import $ from 'jquery';
import 'react-hint/css/index.css';
import ReactTooltip from 'react-tooltip';
import Badge from 'material-ui/Badge';


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
            case "proSeries" :
                colorClass = "pro-series-color";
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
                <div className={"square-btn-copy " + soldOutClass}
                     data-modal-target="#myspecialmodal"
                     data-tip= {event.description}
                     data-name={event.name}
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

    renderBar(event) {

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
            case "series" :
                colorClass = "series-color";
                break;
            case "pro-series" :
                colorClass = "pro-series-color";
                break;
            default:
                break;
        }
        var hiddenClass = "";
        hideMe ? hiddenClass = "hide-me" : "";
        var soldOutClass = "";
        event.spotsLeft<=0 ? soldOutClass="sold-out" : soldOutClass="selectable";
        return(
            <div className={"event-bar " + colorClass + " " + hiddenClass} data-days={event.daystring} data-event-id={event.id}>
            </div>
        );

    }

    render() {

        var dropInEvents = [];
        this.props.dropinevents ? dropInEvents=this.props.dropinevents : dropInEvents=[];
        var specialEvents = [];
        this.props.specialevents ? specialEvents=this.props.specialevents : specialEvents=[];
        var seriesEvents = [];
        this.props.seriesEvents ? seriesEvents=this.props.seriesEvents : seriesEvents=[];
        var proSeriesEvents = [];
        this.props.proSeriesEvents ? proSeriesEvents=this.props.proSeriesEvents : proSeriesEvents=[];
        var campEvents = [];
        this.props.campEvents ? campEvents=this.props.campEvents : campEvents=[];
        //var myIcon = this.props.incart>0 ? <CartIcon num={this.props.incart}/> : "";
        if (this.props.isclosed=="true") {
            return(
                    <div style={{width: '100%'}} data-month={this.props.month} data-dayNum={this.props.value} className="close-me">

                        <div className="day-top-container">
                            <div className="date-number">
                                {this.props.value}
                                {/*<Circle displayCircle="none"/>*/}
                            </div>
                            <div className="date-icon">

                            </div>
                        </div>
                    </div>
            )
        }

        return (
            <div style={{width: '100%'}} data-month={this.props.month} data-dayNum={this.props.value}>

                <div className="day-top-container">
                    <div className="date-number">{this.props.value}
                        <svg className="circle" version="1.0"
                             x="0px" y="0px" width="26.8px" height="27.6px" viewBox="0 0 26.8 27.6"
                        >

                            <g>
                                <path d="M19.2,0c0.9,0.1,1.7,0.7,2.3,1.2c0.6,0.6,1.2,1.2,1.7,1.9c1,1.4,1.8,2.9,2.4,4.6c1.2,3.2,1.6,6.9,0.6,10.3
		c-0.5,1.7-1.3,3.3-2.5,4.7c-0.6,0.7-1.2,1.3-1.9,1.9c-0.7,0.6-1.4,1.1-2.2,1.6c-1.6,0.9-3.5,1.3-5.3,1.3c-1.8,0-3.6-0.4-5.3-1.1
		c-3.4-1.4-6.4-3.9-7.9-7.4C-0.4,15.7-0.5,11.5,1.4,8c1-1.7,2.4-3.2,4.1-4.1c1.7-1,3.6-1.4,5.4-1.5c1.8-0.1,3.6,0.2,5.3,0.7
		c1.7,0.5,3.3,1.4,4.6,2.6l-0.2,0.2c-3-1.5-6.4-1.8-9.5-1.3C9.6,4.9,8.2,5.5,7,6.3C5.8,7.1,4.8,8.2,4.2,9.5
		c-1.3,2.5-1.5,5.7-0.5,8.6c1,2.8,3.4,5.2,6.3,6.5c2.8,1.3,6.2,1.6,9,0.3c2.8-1.5,5.1-4,6.1-7.1c1-3.1,0.8-6.5-0.2-9.7
		c-0.5-1.6-1.2-3.1-2.1-4.5c-0.5-0.7-1-1.4-1.6-1.9c-0.6-0.6-1.3-1.1-2-1.2L19.2,0z"/>
                            </g>
                        </svg>
                    </div>
                    <div className="date-icon">
                        <Badge data-tip="You have an event from this day in you cart" className="badge-class" children="" badgeContent={this.props.incart} color="accent"/>
                    </div>
                </div>
                {/*<div className="event-boxes">*/}

                    {/*{dropInEvents.map((item,i) => this.renderEvent(item, "dropin"), this)}*/}
                    {/*{specialEvents.map((item,i) => this.renderEvent(item, "special"), this)}*/}

                {/*</div>*/}
                <div className="event-bars">
                    {dropInEvents.map((item,i) => this.renderBar(item, "dropin"), this)}
                    {specialEvents.map((item,i) => this.renderBar(item, "special"), this)}
                    {seriesEvents.map((item,i) => this.renderBar(item, "series"), this)}
                    {proSeriesEvents.map((item,i) => this.renderBar(item, "proSeries"), this)}
                    {campEvents.map((item,i) => this.renderBar(item, "camp"), this)}
                </div>
            </div>
        );
    }
}

export default Day;
