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


class DayViewTimeBlock extends React.Component {

    constructor() {
        super();
        // this.state = {
        //
        //     end: this.props.end,
        //     style: this.props.style,
        //     rollover: this.props.rollover,
        //     weekday: this.props.isWeekDay,
        //     type: this.props.type,
        //     addTime: {
        //         series: 90,
        //         proSeries: 75,
        //         makerspace: 90
        //     },
        //     length: this.props.length
        //
        // }

        this.state = {
            timeStartRow: 1,
            rowOneHour: 14,
            hourDivisions: 4
        }

    }

    getEndTime() {

        var start_time =  Moment(this.props.start, "hh:mma");
        var startTimeOfDay = Moment((this.props.isWeekDay? 14 : 10), "HH")
        // var eventStart = Moment(this.props.start);
        var eventEnd = start_time.add(this.props.length,"m");
        console.log("^^^ " + eventEnd.format("HH:mm"));
        return eventEnd.format("hh:mma");

    }

    getRowFromTime (startTime) {
        //var dayStartHour = (this.props.isWeekDay? 14 : 10);
        var start_hour =  Moment(startTime, "hh:mma").format("HH");
        var startRowByHour = (start_hour - ((this.props.isWeekDay? 14 : 10))) * this.state.hourDivisions;
        //var actualHour = start_hour.add(dayStartHour);
        var plusMins = 0;
        switch  (Moment(startTime, "hh:mma").format("mm")) {
            case "00":
                plusMins = 0;
                break;
            case "15":
                plusMins = 1;
                break;
            case "30":
                plusMins = 2;
                break;
            case "45":
                plusMins = 3;
                break;
        }
        return (startRowByHour+plusMins);

    }


    render() {

        console.log("ROW: ", this.getRowFromTime(this.props.start), this.getRowFromTime(this.getEndTime()));

        var row = this.getRowFromTime(this.props.start)+1;
        var row_end = this.getRowFromTime(this.getEndTime())+1;
        return (

            <div className={"time-block " +this.props.type + "-color " + this.props.customClass}
                 style={{
                     gridColumn: 2,
                     gridRowStart: row,
                     gridRowEnd: row_end,
                     zIndex: 1001,
                 }}
            >
                {this.props.name}
            </div>

            //
            // {/*<div className="time-block"*/}
            //      {/*data-tip={this.state.rollover}*/}
            //      {/*style{{*/}
            //
            //          {/*gridColumn: "col 2 / span " + colSpan,*/}
            //          {/*gridRow: "row " + startRow + " / span " + rowSpan,*/}
            //          {/*zIndex: 100*/}
            //
            // {/*}}>*/}
            // {/*</div>*/}

        )


    }

}

export default DayViewTimeBlock;
