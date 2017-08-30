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

            //HAS NOTHING
            if (this.props.hasSeries=="" && this.props.hasDropIn=="" && this.props.hasProSeries=="")

                return (
                    <div className="day-view-container">
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
                            <DayViewTimeBlock
                                isWeekDay = {this.props.isWeekDay}
                                start = "2:30 p.m."
                                length = "270"
                                end = ""
                                customClass = ""
                                name = "No visits scheduled for this day"
                                type = "default"
                            />
                        </div>
                    </div>
                )

            // HAS ONLY PRO
            else if (this.props.hasSeries=="" && this.props.hasDropIn=="" && this.props.hasProSeries!="")

                return (
                    <div className="day-view-container">
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


                                <DayViewTimeBlock
                                    isWeekDay = {this.props.isWeekDay}
                                    start = "5:45 p.m."
                                    length = "75"
                                    customClass = "owned"
                                    name = { this.props.hasProSeries}
                                    type = ""
                                />

                                <DayViewTimeBlock
                                    isWeekDay = {this.props.isWeekDay}
                                    start = "2:30 p.m."
                                    length = "180"
                                    customClass = "warning"
                                    name = ""
                                    type = ""
                                />
                                <DayViewTimeBlock
                                    isWeekDay = {this.props.isWeekDay}
                                    start = "5:30 p.m."
                                    length = "15"
                                    customClass = ""
                                    name = "Check-in"
                                    type = ""
                                />

                            
                        </div>
                    </div>
                )
            //HAS PRO AND ONE OTHER THING
            else if ((this.props.hasSeries!="" || this.props.hasDropIn!="") && this.props.hasProSeries!="")

                return (
                    <div className="day-view-container">
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

                            { this.props.hasPickupScheduled ?

                                <DayViewTimeBlock
                                    isWeekDay = {this.props.isWeekDay}
                                    start = "2:30 p.m."
                                    length = "60"
                                    end = ""
                                    customClass = "owned"
                                    name = {"Walk-over from " + this.props.school}
                                    type = "default"
                                />

                                :
                                this.props.hasPickupOption ?

                                    <DayViewTimeBlock
                                        isWeekDay = {this.props.isWeekDay}
                                        start = "2:30 p.m."
                                        length = "60"
                                        end = ""
                                        customClass = "purchasable"
                                        name = {"Add-on Available: Walk-over from " + this.props.school + " for $"+this.props.pickupPrice}
                                        type = "default"
                                    />
                                    :
                                    <DayViewTimeBlock
                                        isWeekDay = {this.props.isWeekDay}
                                        start = "2:30 p.m."
                                        length = "60"
                                        end = ""
                                        customClass = ""
                                        name = "Flexible check-in"
                                        type = "default"
                                    />

                            }

                            <DayViewTimeBlock
                                isWeekDay = {this.props.isWeekDay}
                                start = "5:45 p.m."
                                length = "75"
                                customClass = "owned"
                                name = { this.props.hasProSeries}
                                type = ""
                            />
                            <DayViewTimeBlock
                                isWeekDay = {this.props.isWeekDay}
                                start = "5:30 p.m."
                                length = "15"
                                customClass = ""
                                name = "Screen Break"
                                type = ""
                            />
                            <DayViewTimeBlock
                                isWeekDay={this.props.isWeekDay}
                                start="3:30 p.m."
                                length="30"
                                customClass=""
                                name="Snack and homework help"
                                type="default"
                            />
                            <DayViewTimeBlock
                                isWeekDay = {this.props.isWeekDay}
                                start = "4:00 p.m."
                                length = "90"
                                customClass = "owned"
                                name = {this.props.hasSeries + this.props.hasDropIn}
                                type = ""
                            />


                        </div>
                    </div>
                )

            else if ((this.props.hasSeries!="" || this.props.hasDropIn!="") && this.props.hasProSeries=="")

                return (
                    <div className="day-view-container">
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


                            { this.props.hasPickupScheduled ?

                                <DayViewTimeBlock
                                    isWeekDay = {this.props.isWeekDay}
                                    start = "2:30 p.m."
                                    length = "60"
                                    end = ""
                                    customClass = "owned"
                                    name = {"Walk-over from " + this.props.school}
                                    type = "default"
                                />

                                :
                                this.props.hasPickupOption ?

                                    <DayViewTimeBlock
                                        isWeekDay = {this.props.isWeekDay}
                                        start = "2:30 p.m."
                                        length = "60"
                                        end = ""
                                        customClass = "purchasable"
                                        name = {"Add-on Available: Walk-over from " + this.props.school + " for $"+this.props.pickupPrice}
                                        type = "default"
                                    />
                                    :
                                    <DayViewTimeBlock
                                        isWeekDay = {this.props.isWeekDay}
                                        start = "2:30 p.m."
                                        length = "60"
                                        end = ""
                                        customClass = ""
                                        name = "Flexible check-in"
                                        type = "default"
                                    />

                            }


                            <DayViewTimeBlock
                                isWeekDay={this.props.isWeekDay}
                                start="3:30 p.m."
                                length="30"
                                customClass=""
                                name="Snack and homework help"
                                type="default"
                            />
                            <DayViewTimeBlock
                                isWeekDay = {this.props.isWeekDay}
                                start = "4:00 p.m."
                                length = "90"
                                customClass = "owned"
                                name = {this.props.hasSeries + this.props.hasDropIn}
                                type = ""
                            />
                            <DayViewTimeBlock
                                isWeekDay = {this.props.isWeekDay}
                                start = "5:30 p.m."
                                length = "60"
                                customClass = ""
                                name = "Makerspace & flexible check-out"
                                type = ""
                            />



                        </div>
                    </div>
                )



        } else return(null)


    }

}

DayView.defaultProps = {
    name: "",
    type: "default",
    customClass: "",
    isWeekDay: true,
    start: "2:30 p.m.",
    length: 60,
    hasPickupScheduled: false,
    hasPickupOption: false,
    school: "",
    pickupPrice: 10
};

// customClass: not-allowed | in-cart | warning | owned | purchasable

export default DayView;
