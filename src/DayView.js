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

    //default blocks


    render() {

        var dayColArr = this.makeTimeArray();

        var blocksToDisplay = [];
        blocksToDisplay = this.props.blocks;

        if (this.props.isViewingDay) {

            return(

                <div className="day-view-container">
                    {/*Preview for {this.props.dayOfWeek}*/}

                    {/*<div className="my-day-selection-box">*/}
                    {/*/!*<div className={this.props.selectedDay=="mon"? "selected-day-of-week" : ""}>M</div>*!/*/}
                    {/*/!*<div className={this.props.selectedDay=="tue"? "selected-day-of-week" : ""}>T</div>*!/*/}
                    {/*/!*<div className={this.props.selectedDay=="wed"? "selected-day-of-week" : ""}>W</div>*!/*/}
                    {/*/!*<div className={this.props.selectedDay=="thu"? "selected-day-of-week" : ""}>Th</div>*!/*/}
                    {/*/!*<div className={this.props.selectedDay=="fri"? "selected-day-of-week" : ""}>F</div>*!/*/}
                    {/*/!*<div className={this.props.selectedDay=="sat"? "selected-day-of-week" : ""}>Sa</div>*!/*/}
                    {/*/!*<div className={this.props.selectedDay=="sun"? "selected-day-of-week" : ""}>Su</div>*!/*/}
                    {/*</div>*/}
                    <div className="day-view">
                        <div></div>

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

                        {blocksToDisplay.map((block, index) =>

                            <DayViewTimeBlock
                                isWeekDay = {block.isWeekDay}
                                start = {block.start}
                                length = {block.length}
                                end = ""
                                customClass = {block.customClass}
                                name = {block.name}
                                type = {block.type}
                            />

                        )}

                    </div>
                </div>

            );

        } else return(null)


    }

}

export default DayView;
