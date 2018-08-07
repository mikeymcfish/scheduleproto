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

//TODO
// - if a season is sold out the cart is sold out

class TrackSelection extends React.Component {

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

    hideOverlays = () => {
        this.props.hideOverlays();
    }

    handleAddToCart = () => {
        this.setState({
            inCart: true
        });
        this.props.addToCart(this.props.eventObj);
    }


    render() {

        this.getDayTitleString();



        var isDisabled = "";

        this.props.isInCart ? isDisabled = "disabled" : isDisabled = "";


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
                            <div className="subway-icon color roblox-track">
                                <div>R</div>
                            </div>
                                {/*<img src={this.props.image} className="event-image"/>*/}
                        </div>
                        <div className="right-side">
                            <div className="title-container">


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

                                </div>
                            </div>
                            <Divider/>
                            <div className="sub-title">
                                {this.props.copy}
                            </div>
                            <Divider/>
                        </div>

                    </div>



                    <div className="bottom-container-new">

                        <div className="full-track-button">
                            {
                                parseInt(this.props.trackSpots) > 0 ?
                                    <div className="button-col">
                                        <div className="add-to-text">
                                            { this.props.trackInCart>=0 ? "" : "add FULL TRACK to cart"}
                                             - ({ this.props.trackInCart>=0 ? "" : this.props.trackSpots + " spots left"})

                                        </div>


                                        { this.props.trackInCart>=0 ?
                                            <Button disabled raised color="primary" className="btn-2">
                                                <div><span className="price-text-btn1">in cart</span></div>
                                            </Button>
                                            :
                                            <Button raised color="primary" type="track" className="btn-2" onClick={this.handleAddToCart}>
                                                <div>
                                                    {
                                                        this.props.trackPrice != this.props.originalPrice ?


                                                            <span className="price-text-btn1">
                                                        <span className="former-price">
                                                         ${this.props.originalPrice}
                                                        </span>
                                                        ${this.props.trackPrice}
                                                    </span>

                                                            :

                                                            <span className="price-text-btn1">
                                                        ${this.props.trackPrice}
                                                    </span>

                                                    }

                                                </div>
                                            </Button>
                                        }
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
                        <div className="seasons-button-container">
                            <div className="season-button fall-season">
                                {
                                    parseInt(this.props.fallSpots) > 0 ?
                                        <div className="button-col">
                                            <div className="add-to-text">
                                                { this.props.fallInCart>=0 ? "" : "add FALL to cart"}
                                            </div>


                                            { this.props.fallInCart>=0 ?
                                                <Button disabled raised color="primary" className="btn-3">
                                                    <div><span className="price-text-btn1">in cart</span></div>
                                                </Button>
                                                :
                                                <Button raised color="primary" type="fall" className="btn-3" onClick={this.handleAddToCart}>
                                                    <div>
                                                        <span className="price-text-btn1">
                                                            ${this.props.fallPrice}
                                                        </span>

                                                    </div>
                                                </Button>
                                            }

                                            <div className="add-to-text">
                                                { this.props.fallInCart>=0 ? "" : this.props.fallSpots + " spots left"}
                                            </div>
                                        </div>
                                        :
                                        <div className="button-col">
                                            <div className="add-to-text">
                                            </div>
                                            <Button disabled color="primary" className="btn-3">
                                                <div><span className="price-text">SOLD OUT!</span></div>
                                            </Button>
                                            {/*<div className="add-to-text waitlist-text">*/}
                                            {/*join waitlist*/}
                                            {/*</div>*/}
                                        </div>
                                }

                            </div>
                            <div className="season-button winter-season">
                                {
                                    parseInt(this.props.winterSpots) > 0 ?
                                        <div className="button-col">
                                            <div className="add-to-text">
                                                { this.props.winterInCart>=0 ? "" : "add WINTER to cart"}
                                            </div>


                                            { this.props.winterInCart>=0 ?
                                                <Button disabled raised color="primary" className="btn-3">
                                                    <div><span className="price-text-btn1">in cart</span></div>
                                                </Button>
                                                :
                                                <Button raised color="primary" type="winter" className="btn-3" onClick={this.handleAddToCart}>
                                                    <div>
                                                        <span className="price-text-btn1">
                                                            ${this.props.winterPrice}
                                                        </span>

                                                    </div>
                                                </Button>
                                            }

                                            <div className="add-to-text">
                                                { this.props.winterInCart>=0 ? "" : this.props.winterSpots + " spots left"}
                                            </div>
                                        </div>
                                        :
                                        <div className="button-col">
                                            <div className="add-to-text">
                                            </div>
                                            <Button disabled color="primary" className="btn-3">
                                                <div><span className="price-text">SOLD OUT!</span></div>
                                            </Button>
                                            {/*<div className="add-to-text waitlist-text">*/}
                                            {/*join waitlist*/}
                                            {/*</div>*/}
                                        </div>
                                }

                            </div>
                            <div className="season-button spring-season">
                                {
                                    parseInt(this.props.springSpots) > 0 ?
                                        <div className="button-col">
                                            <div className="add-to-text">
                                                { this.props.springInCart>=0 ? "" : "add SPRING to cart"}
                                            </div>


                                            { this.props.springInCart>=0 ?
                                                <Button disabled raised color="primary" className="btn-3">
                                                    <div><span className="price-text-btn1">in cart</span></div>
                                                </Button>
                                                :
                                                <Button raised color="primary" type="spring" className="btn-3" onClick={this.handleAddToCart}>
                                                    <div>
                                                        <span className="price-text-btn1">
                                                            ${this.props.springPrice}
                                                        </span>

                                                    </div>
                                                </Button>
                                            }

                                            <div className="add-to-text">
                                                { this.props.springInCart>=0 ? "" : this.props.springSpots + " spots left"}
                                            </div>
                                        </div>
                                        :
                                        <div className="button-col">
                                            <div className="add-to-text">
                                            </div>
                                            <Button disabled color="primary" className="btn-3">
                                                <div><span className="price-text">SOLD OUT!</span></div>
                                            </Button>
                                            {/*<div className="add-to-text waitlist-text">*/}
                                            {/*join waitlist*/}
                                            {/*</div>*/}
                                        </div>
                                }

                            </div>
                    </div>
                    </div>

                </div>


            </div>





        )


    }

}

export default TrackSelection;
