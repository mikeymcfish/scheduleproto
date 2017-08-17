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


class BigDay extends React.Component {

    // RenderWeekNames(i) {
    //     return (
    //         <div className="week-names">{i}</div>
    //     )
    // }

    getDayTitleString() {

        var month = this.props.month;
        var day = this.props.day;
        var date = Moment(month + " " + day);
        return date.format("dddd, MMMM Do");

    }

    convertDayString(daystring) {
        var newString = daystring.replace(/-/g, "/");
        newString = newString.replace(/,/g, ", ");
        // count the commas
        var numDays = newString.split(",").length;
        if (numDays <=1) {
            newString = newString + " (only 1 day)";
        } else {
            newString = newString + " (includes " + numDays + " days)";
        }
        return newString;
    }

    render() {

        this.getDayTitleString();

        var allDays = [];
        for (var i = 1; i <= this.props.skipDays; i++) {
            allDays.push(
                <div id="no-day"></div>
            );
            console.log(i);
        }


        return (
            <div>
                {/*<div className="big-day-title">*/}
                {/*{this.getDayTitleString()}*/}
                {/*</div>*/}
                <div className="big-day">
                    {/*<div className="top-container">*/}
                    {/*<div className="date-container">*/}
                    {/*Monday, September 5th*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    <div className="content-container">
                        <div className="left-side">
                            <div className="pic">
                            </div>
                        </div>
                        <div className="right-side">
                            <div className="title-container">

                                    {this.props.type=="pro"?
                                        <div className="title">
                                            <span className="pro-tag">PRO</span>{this.props.title}
                                        </div>
                                        :
                                        <div className="title">
                                            {this.props.title}
                                        </div>
                                    }

                                <div className="tags">
                                    {this.props.tags.map((tag, index) => <Tag
                                        text={tag.text}
                                        tagType={tag.tagType}
                                    />)}
                                </div>
                            </div>
                            <Divider/>
                            <div className="info-section">
                                <div className="line-item">
                                    <div className="property">
                                        ages
                                    </div>
                                    <div className="detail">
                                        {this.props.ages}
                                    </div>
                                </div>
                                <div className="line-item">
                                    <div className="property">
                                        time
                                    </div>
                                    <div className="detail">
                                        {this.props.time}
                                    </div>
                                </div>
                                <div className="line-item">
                                    <div className="property">
                                        dates
                                    </div>
                                    <div className="detail">
                                        {this.convertDayString(this.props.dates)}
                                    </div>
                                </div>
                            </div>
                            <Divider/>
                            <div className="sub-title">
                                {this.props.copy}
                            </div>
                            <Divider/>
                        </div>

                    </div>

                    <div className="bottom-container">
                        <Button raised color="secondary" className="btn-1">learn more</Button>

                        <div className="or-thing">
                            <div className="vertical-bar">
                            </div>
                            <div>
                                OR
                            </div>
                            <div className="vertical-bar">
                            </div>

                        </div>


                        {parseInt(this.props.spotsLeft) > 0 ?
                            <div className="button-col">
                                <div className="add-to-text">
                                    add to cart
                                </div>
                                <Button raised color="primary" className="btn-2">
                                    <div><span className="price-text">{this.props.price}</span></div>
                                </Button>
                                <div className="add-to-text">
                                    {this.props.spotsLeft + " spots left"}
                                </div>
                            </div>
                            :
                            <div className="button-col">
                                <div className="add-to-text">
                                </div>
                                <Button disabled color="primary" className="btn-2">
                                    <div><span className="price-text">SOLD OUT!</span></div>
                                </Button>
                                <div className="add-to-text waitlist-text">
                                    join waitlist
                                </div>
                            </div>
                        }

                    </div>
                </div>


            </div>





        )


    }

}

export default BigDay;
