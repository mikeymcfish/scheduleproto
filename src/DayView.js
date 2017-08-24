import React, {Component} from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';
import ReactTooltip from 'react-tooltip'
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Tag from "./Tag";
import Moment from "moment";
import DayViewTimeBlock from "./DayViewTimeBlock";


class DayView extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    addATimeBlock(start, end, style, rollover) {
        return null
    }

    hideOverlays = () => {
        this.props.hideOverlays();
    }

    handleAddToCart = () => {
        this.setState({
            inCart: true
        });
        this.props.addToCart(this.props.eventObj);
    }

    makeTimeArray() {
        var startTime = (this.props.isWeekDay? "2:00pm" : "10:am");
        var returnArray = [];
        //run for 6 hours
        for (var i=0; i<(5*5); i++) {
            returnArray.push(Moment(startTime,"hh:mma").add(i*15,"m").format("h:mm a"));
        }
        return returnArray;
    }


    render() {

        var dayColArr = this.makeTimeArray();


        return (

            <div className="day-view">

                {dayColArr.map((time, index) =>

                    <div className={"time-display time-"+index%4}
                        style = {{

                            gridRowStart : index+1,
                            gridColStart : "1"
                        }}
                    >
                        {time}
                    </div>

                )}
                <DayViewTimeBlock
                    isWeekDay = "true"
                    start = "2:30pm"
                    length = {60*1.5}
                    end = "7:00pm"
                    customClass = "striped"
                    name = "NOT PURCHASED"
                />

               <DayViewTimeBlock
                   isWeekDay = "true"
                   start = "4:00pm"
                   length = "90"
                   end = "5:00pm"
                   type = "series"
                   customClass = ""
                   name = "Regular Series"
               />
                <DayViewTimeBlock
                    isWeekDay = "true"
                    start = "5:45pm"
                    length = "75"
                    end = "7:00pm"
                    type = "pro-series"
                    customClass = ""
                    name = "PRO series"

                />
                <DayViewTimeBlock
                    isWeekDay = "true"
                    start = "2:00pm"
                    length = "30"
                    end = "7:00pm"
                    type = "drop-in"
                    customClass = ""
                    name = "Drop-in"

                />

            </div>

        )


    }

}

export default DayView;
