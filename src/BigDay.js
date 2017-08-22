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

    constructor() {
        super();
        this.state = {
            inCart:false
        }
    }

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

    showOverlay = () => {
        //var days = this.props.days;
        this.props.addOverlay(this.props.dates);
    }

    handleAddToCart = () => {
        this.setState({
            inCart: true
        });
        this.props.addToCart(this.props.eventObj);
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

        var isDisabled = "";

        this.props.isInCart ? isDisabled = "disabled" : isDisabled = "";

        var backgroundImg = "url('" + this.props.image + "')";

        return (
            <div>
                {/*<div className="big-day-title">*/}
                {/*{this.getDayTitleString()}*/}
                {/*</div>*/}
                {/*this.props.onClose(this.state.open)*/}
                <div className="big-day">
                    {/*<div className="top-container">*/}
                    {/*<div className="date-container">*/}
                    {/*Monday, September 5th*/}
                    {/*</div>*/}
                    {/*</div>*/}

                    <div className="content-container">
                        <div className="left-side">
                            <div className={"color-bar " + this.props.type + "-color"}>
                            </div>
                            <div
                                className={"pic " + this.props.type + "-color"}
                                 style={{backgroundImage: backgroundImg}}
                                >
                                {/*<img src={this.props.image} className="event-image"/>*/}
                            </div>
                        </div>
                        <div className="right-side">
                            <div className="title-container">

                                    {this.props.type=="pro-series"?
                                        <div className="title">
                                            <span className="pro-tag">PRO</span>{this.props.title}
                                        </div>
                                        :
                                        <div className="title">
                                            {this.props.title}
                                        </div>
                                    }
                                {/*TAGS DISABLED*/}
                                {/*<div className="tags">*/}
                                    {/*{this.props.tags.map((tag, index) => <Tag*/}
                                        {/*text={tag.text}*/}
                                        {/*tagType={tag.tagType}*/}
                                    {/*/>)}*/}
                                {/*</div>*/}
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
                                    <div className="detail dates-link" onClick={this.showOverlay}>
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

                    { parseInt(this.props.doesOwn) >= 0 ?
                    <div className="bottom-container you-own">
                        You have purchased this event for {this.props.memberName}
                    </div>

                        :

                    //bottom container with button
                    <div className="bottom-container">

                        {
                            parseInt(this.props.spotsLeft) > 0 ?
                            <div className="button-col">
                                <div className="add-to-text">
                                    { this.props.isInCart>=0 ? "" : "add to cart"}
                                </div>


                                { this.props.isInCart>=0 ?
                                    <Button disabled raised color="primary" className="btn-2">
                                        <div><span className="price-text">in cart</span></div>
                                    </Button>
                                    :
                                    <Button raised color="primary" className="btn-2" onClick={this.handleAddToCart}>
                                        <div>
                                            {
                                                this.props.price != this.props.originalPrice ?


                                                    <span className="price-text">
                                                        <span className="former-price">
                                                         ${this.props.originalPrice}
                                                        </span>
                                                        ${this.props.price}
                                                    </span>

                                                    :

                                                    <span className="price-text">
                                                        ${this.props.price}
                                                    </span>

                                            }

                                        </div>
                                    </Button>
                                }

                                <div className="add-to-text">
                                    { this.props.isInCart>=0 ? "" : this.props.spotsLeft + " spots left"}
                                </div>
                            </div>
                            :
                            <div className="button-col">
                                <div className="add-to-text">
                                </div>
                                <Button disabled color="primary" className="btn-2">
                                    <div><span className="price-text">SOLD OUT!</span></div>
                                </Button>
                                {/*<div className="add-to-text waitlist-text">*/}
                                    {/*join waitlist*/}
                                {/*</div>*/}
                            </div>
                        }

                    </div>

                    }

                </div>


            </div>





        )


    }

}

export default BigDay;
