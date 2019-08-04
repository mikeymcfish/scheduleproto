import React, { Component } from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import CartIcon from './icons/CartIcon';
import $ from 'jquery';
import 'react-hint/css/index.css';
import ReactTooltip from 'react-tooltip';
import Badge from 'material-ui/Badge';
import Button from 'material-ui/Button';


class Track extends React.Component {


    constructor() {
        super();

        this.state = {
            highlightColor : "blue",
            fallHighlightClass: "",
            winterHighlightClass: "",
            springHighlightClass: "",
            fall: true,
            winter: true,
            spring: true,
            highlightTrack: "",
            highlightAll: false,
            fallInCart: false,
            trackInCart: false,
            winterInCart: false,
            springInCart: false
        }
        this.changeFallHighlight = this.changeFallHighlight.bind(this);
        this.changeWinterHighlight = this.changeWinterHighlight.bind(this);
        this.changeSpringHighlight = this.changeSpringHighlight.bind(this);
        this.highlightFullTrack = this.highlightFullTrack.bind(this);
        this.removeAllHighlights = this.removeAllHighlights.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleAddTrackToCart = this.handleAddTrackToCart.bind(this);


}

    componentDidUpdate() {
        $(".in-cart-2").removeClass(".in-cart-2");
        console.log("CART-Z- component did update");
        // if (this.props.fallDoesOwn) {
        //     $(".season-button.fall-season").addClass("owned-event");
        // }
        // if (this.props.winterDoesOwn) {
        //     $(".season-button.winter-season").addClass("owned-event");
        // }
        // if (this.props.springDoesOwn) {
        //     $(".season-button.spring-season").addClass("owned-event");
        // }
    }

    componentDidMount() {
        this.props.cart.forEach((event, index) => {

            if (event==this.props.fallEvent.id) {
                this.setState({fallInCart: true});
            }
            if (event==this.props.winterEvent.id) {
                this.setState({winterEvent: true});
            }
            if (event==this.props.springEvent.id) {
                this.setState({springEvent: true});
            }

        });

    }

    handleAddToCart() {

        //find whichever states are true and add those
        if (this.state.fall) {

            this.props.addToCart(this.props.fallEvent);
            console.log("CART-X-adding-FALL");

        }
        if (this.state.winter) {

            this.props.addToCart(this.props.winterEvent);
            console.log("CART-X-adding-WINTER");

        }
        if (this.state.spring) {

            this.props.addToCart(this.props.springEvent);
            console.log("CART-X-adding-SPRING");

        }
    }

    handleAddTrackToCart() {
        this.props.addThreeToCart(this.props.fallEvent,this.props.winterEvent,this.props.springEvent);
    }

    checkCart() {

    }

    changeFallHighlight() {
        this.removeAllHighlights();
        console.log("HIGHLIGHT - changing fall highlight");
        this.setState({fallHighlightTrack:"highlight-track-fall"});
        this.setState({fall:true});
        this.setState({winter:false});
        this.setState({spring:false});
        this.setState({highlightTrack:"highlight-track-fall"});

    }

    changeWinterHighlight() {
        this.removeAllHighlights();
        this.setState({highlightTrack:"highlight-track-winter"});
        this.setState({fall:false});
        this.setState({winter:true});
        this.setState({spring:false});
    }

    changeSpringHighlight() {
        this.removeAllHighlights();
        this.setState({highlightTrack:"highlight-track-spring"});
        this.setState({fall:false});
        this.setState({winter:false});
        this.setState({spring:true});

    }

    highlightFullTrack() {
        this.removeAllHighlights();
        this.setState({highlightTrack:"highlight-track-full"});

        // this.setState({highlightAll:true});
    }

    removeAllHighlights() {
        console.log("HIGHLIGHT - clearing all");

        this.setState({fall:true});
        this.setState({winter:true});
        this.setState({spring:true});
        this.setState({highlightTrack:""});
        this.setState({highlightAll:false});

    }

    render() {

        //
        // if (this.props.fallInCart>0) this.setState({fallInCart: true});
        // if (this.props.winterInCart>0) this.setState({winterInCart: true});
        // if (this.props.springInCart>0) this.setState({springInCart: true});
        if (this.props.topic=="roblox") {
            return(this.renderRoblox())
        }
        if (this.props.topic=="fortnite") {
            return(this.renderFortnite())
        }
        if (this.props.topic=="minecraft") {
            return(this.renderMinecraft())
        }
        if (this.props.topic=="coding") {
            return(this.renderCoding())
        }
        if (this.props.topic=="video") {
            return(this.renderVideo())
        }
        if (this.props.topic=="hardware") {
            return(this.renderHardware())
        }
        if (this.props.topic=="deck") {
            return(this.renderDeck())
        }
        if (this.props.topic=="pc") {
            return(this.renderPC())
        }
        return (
            <div></div>
        )

    }

    getFullTrackText() {

        if (this.state.fallInCart && this.state.winterInCart && this.state.springInCart) {
            return (
                <div className="price-text-2 button-price-container">
                    FULL SEASON IN CART
                </div>
            );
        } else {

            var price = parseFloat(this.props.fallPrice) + parseFloat(this.props.winterPrice) + parseFloat(this.props.springPrice);
            var discountAmount = parseFloat(this.props.fullTrackDiscount);

            var newPrice = price - ( price * 0.15 );
            var savings = price - newPrice;


            return (
                <div className="price-text-2 button-price-container">
                    <div className="button-left-container">
                        <div className="">full track</div>
                    </div>
                    <div className="button-right-container">
                        <div className="">${newPrice}</div>
                        <div className="">save ${savings}!</div>
                    </div>
                </div>
            );

        }
    }

    getFallText() {

        if (this.state.fallInCart) {
            return (
                <div className="price-text-2 button-price-container">
                    FALL SEASON IN CART
                </div>
            );
        } else {

            return (
                <div className="price-text-2 button-price-container">
                    <div className="button-left-container">
                        <div className="">fall season</div>
                        <div className="">{this.props.fallWeeks} weeks</div>
                    </div>
                    <div className="button-right-container">
                        <div className="">${this.props.fallPrice}</div>
                    </div>
                </div>
            );

        }


    }

    getWinterText() {

        if (this.state.winterInCart) {
            return (
                <div className="price-text-2 button-price-container">
                    WINTER SEASON IN CART
                </div>
            );
        } else {

            return (
                <div className="price-text-2 button-price-container">
                    <div className="button-left-container">
                        <div className="">winter season</div>
                        <div className="">{this.props.winterWeeks} weeks</div>
                    </div>
                    <div className="button-right-container">
                        <div className="">${this.props.winterPrice}</div>
                    </div>
                </div>
            );

        }

    }

    getSpringText() {

        if (this.state.springInCart) {
            return (
                <div className="price-text-2 button-price-container">
                    SPRING SEASON IN CART
                </div>
            );
        } else {

            return (
                <div className="price-text-2 button-price-container">
                    <div className="button-left-container">
                        <div className="">spring season</div>
                        <div className="">{this.props.springWeeks} weeks</div>
                    </div>
                    <div className="button-right-container">
                        <div className="">${this.props.springPrice}</div>
                    </div>
                </div>
            );

        }

    }

    getSeasonHTML(left, season) {
        var showOrHideTest = false;
        if (season=="fall") {
            showOrHideTest = !this.state.fall;
        } else if (season=="winter") {
            showOrHideTest = !this.state.winter;
        } else if (season=="spring") {
            showOrHideTest = !this.state.spring;
        } else if (this.props.topic=="climbing") {
            if (season=="winter") {
                showOrHideTest = false;
            }
            else showOrHideTest=true;
        }
        return (
            <div className={

                showOrHideTest?
                    "season-start hide-me"
                    :
                    "season-start"
            }
                 style={{left: left+"%"}}>

            </div>
        )
    }

    isInCart(event) {

        for (var i=0; i< this.props.cart.length; i++) {
            if (event.id==this.props.cart[i]) return true;
        }
        return false;
    }

    getProjectHTML(left, description_line1, description_line2="", season, isMini=false) {
        var showOrHideTest = false;
        if (season=="fall") {
            showOrHideTest = !this.state.fall;
        } else if (season=="winter") {
            showOrHideTest = !this.state.winter;
        } else if (season=="spring") {
            showOrHideTest = !this.state.spring;
        }  else if (this.props.topic=="climbing") {
            if (season=="winter") {
                showOrHideTest = false;
            }
            else showOrHideTest=true;
        }
        return(
            <div className={

                showOrHideTest?
                    "project-start hide-me"
                    :
                    "project-start"
                }
                 style={{left: left+"%"}}>
                <div className={isMini? "project-name mini-course" : "project-name"}>
                    {description_line1}<br></br>
                    {description_line2}
                </div>
            </div>
            )

    }

    getButtonsHTML(topic) {
        return (
            <div className="bottom-container-new">
                <div className="dates-list">
                    <span className="dates-preface">Dates for {this.props.dayOfWeek} at {this.props.location}: </span>
                    <span className={
                        this.state.fall ?
                            "show-dates" :
                            "hide-dates"

                    }>
                        {this.props.fallDates+" "}
                    </span>
                    <span className={
                        this.state.winter ?
                            "show-dates" :
                            "hide-dates"

                    }>
                        {this.props.winterDates+ " "}
                    </span>
                    <span className={
                        this.state.spring ?
                            "show-dates" :
                            "hide-dates"

                    }>
                        {this.props.springDates+" "}
                    </span>

                </div>

                {this.props.doesOwnFall && this.props.doesOwnWinter && this.props.doesOwnSpring ?

                    <div></div>


                    :

                    this.props.springSpots<=0 || this.props.winterSpots<=0 || this.props.fallSpots<=0?

                        <div></div>

                    :

                    <div
                        className={
                            (this.props.fallInCart >= 0 && this.props.winterInCart >= 0 && this.props.springInCart >= 0) ?
                                "full-track-button in-cart-2"
                                :
                                "full-track-button"
                        }
                        onMouseEnter={this.highlightFullTrack.bind()}
                        onMouseLeave={this.removeAllHighlights.bind()}
                        onClick={this.handleAddTrackToCart.bind()}
                    >
                        {/*
                        <div className="add-to-text">
                            add full track to cart - (3 spots left)
                        </div>
                        */}
                        <Button disabled color="primary" className="color">
                            <div>{this.getFullTrackText()}</div>
                        </Button>
                    </div>
                }
                <div className="seasons-button-container">

                    {this.props.doesOwnFall ?

                        this.props.memberName==""?

                            <div className={"owned-event-button"}>You are reserved for the fall season.</div>

                            :

                            <div className={"owned-event-button"}>{this.props.memberName} is reserved for the fall season</div>


                        :
                        this.props.fallSpots>0?

                        <div
                            className={this.isInCart(this.props.fallEvent)? "season-button fall-season in-cart-2" : "season-button fall-season"}
                            onMouseEnter={this.changeFallHighlight.bind()}
                            onMouseLeave={this.removeAllHighlights.bind()}
                            onClick ={this.handleAddToCart.bind()}
                            data-event-id={this.props.fallEvent.id}
                        >
                            <Button disabled color="primary" className="color" >
                                {this.getFallText()}
                            </Button>
                            <div className="add-to-text">{this.props.fallSpots} spots left</div>

                        </div>
                        :

                        <div
                        className={"season-button fall-season sold-out-event"}
                        data-event-id={this.props.fallEvent.id}
                        >
                        <Button disabled color="primary" className="color">
                        <div>{this.getFallText()}</div>
                        </Button>
                        <div className="add-to-text">SOLD OUT!</div>

                        </div>


                    }

                    {this.props.doesOwnWinter ?

                        this.props.memberName == "" ?

                            <div className={"owned-event-button"}>You are reserved for the winter season.</div>

                            :

                            <div className={"owned-event-button"}>{this.props.memberName} is reserved for the winter
                                season</div>


                        :

                        this.props.winterSpots > 0 ?


                        <div
                            className={this.isInCart(this.props.winterEvent) ? "season-button winter-season in-cart-2" : "season-button winter-season "}
                            onMouseEnter={this.changeWinterHighlight.bind()}
                            onMouseLeave={this.removeAllHighlights.bind()}
                            onClick={this.handleAddToCart.bind()}
                            data-event-id={this.props.winterEvent.id}
                        >
                            <Button disabled color="primary" className="color">
                                <div>{this.getWinterText()}</div>
                            </Button>
                            <div className="add-to-text">{this.props.winterSpots} spots left</div>
                        </div>

                            :

                            <div
                                className={"season-button winter-season sold-out-event"}
                                data-event-id={this.props.winterEvent.id}
                            >
                                <Button disabled color="primary" className="color">
                                    <div>{this.getWinterText()}</div>
                                </Button>
                                <div className="add-to-text">SOLD OUT!</div>

                            </div>
                    }
                    {this.props.doesOwnSpring ?

                        this.props.memberName == "" ?

                            <div className={"owned-event-button"}>You are reserved for the spring season.</div>

                            :

                            <div className={"owned-event-button"}>{this.props.memberName} is reserved for the spring
                                season</div>

                        :

                        this.props.springSpots > 0 ?

                            <div
                                className={this.isInCart(this.props.springEvent) ? "season-button spring-season in-cart-2" : "season-button spring-season "}
                                onMouseEnter={this.changeSpringHighlight.bind()}
                                onMouseLeave={this.removeAllHighlights.bind()}
                                onClick={this.handleAddToCart.bind()}
                                data-event-id={this.props.springEvent.id}
                            >
                                <Button disabled color="primary" className="color">
                                    <div>{this.getSpringText()}</div>
                                </Button>
                                <div className="add-to-text">{this.props.springSpots} spots left</div>

                            </div>

                            :
                            <div
                                className={"season-button spring-season sold-out-event"}
                                data-event-id={this.props.springEvent.id}
                            >
                                <Button disabled color="primary" className="color">
                                    <div>{this.getSpringText()}</div>
                                </Button>
                                <div className="add-to-text">SOLD OUT!</div>

                            </div>


                    }
                </div>
            </div>
        )
    }

    renderRoblox() {
        return(
            <div className="new-track break-page" id="roblox-track">

                <div className="track-photos roblox-color">
                    <div className="left-container">
                        {/*<div className="subway-icon color">*/}
                            {/*/!*<div>R</div>*!/*/}
                        {/*</div>*/}
                        <div id="roblox-subway" className="subway-icon-image"></div>
                        <div className="under-track-title">Roblox Game Design</div>
                    </div>

                    <div className="season-photo" id="roblox-fall">
                        <div className="inner-photo">
                            <div className="color-overlay">

                            </div>
                        </div>
                        <div className="photo-text">
                            Fall Project
                        </div>
                    </div>

                </div>
                <div className="track-info">

                    <div className="track-name">

                        <div className="track-label">
                            <div className="tag-section">
                                {/*<div className="skills-section">*/}
                                    {/*<div className="offered-at">Skills covered in this track</div>*/}

                                    {/*<div className="list-of-skills roblox-color">*/}
                                        {/*<div className="skill">3D Modeling</div>*/}
                                        {/*<div className="skill">Game Design</div>*/}
                                        {/*<div className="skill">LUA</div>*/}
                                        {/*<div className="skill">Roblox Studio</div>*/}
                                        {/*<div className="online-safety-tag">Online Safety</div>*/}
                                        {/*<div className="age7to9">ages 7 - 9</div>*/}
                                        {/*<div className="age9to11">ages 9 - 11</div>*/}

                                    {/*</div>*/}


                                {/*</div>*/}
                                {/*<div className="options-section">*/}
                                    {/*<div className="location">*/}
                                        {/*<div className="offered-at">Offered in Brooklyn</div>*/}
                                        {/*<div className="ages-tags">*/}
                                            {/*<div className="age">*/}
                                                {/*<div className="age7to9 age-title">ages 7 - 9</div>*/}
                                                {/*<div className="age-group">*/}

                                                    {/*<div className="">Tue</div>*/}
                                                    {/*<div className="">Wed</div>*/}
                                                    {/*<div className="">Fri</div>*/}

                                                {/*</div>*/}

                                            {/*</div>*/}
                                            {/*<div className="age">*/}
                                                {/*<div className="age9to11 age-title">ages 9 - 11</div>*/}
                                                {/*<div className="age-group">*/}
                                                    {/*<div className="">Mon</div>*/}
                                                    {/*<div className="">Thu</div>*/}
                                                {/*</div>*/}

                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="location">*/}
                                        {/*<div className="offered-at">Offered in Tribeca</div>*/}
                                        {/*<div className="ages-tags">*/}
                                            {/*<div className="age">*/}
                                                {/*<div className="age7to9 age-title">ages 7 - 9</div>*/}
                                                {/*<div className="age-group">*/}

                                                    {/*<div className="">Tue</div>*/}
                                                    {/*<div className="">Wed</div>*/}
                                                    {/*<div className="">Fri</div>*/}

                                                {/*</div>*/}

                                            {/*</div>*/}
                                            {/*<div className="age">*/}
                                                {/*<div className="age9to11 age-title">ages 9 - 11</div>*/}
                                                {/*<div className="age-group">*/}
                                                    {/*<div className="">Mon</div>*/}
                                                    {/*<div className="">Thu</div>*/}
                                                {/*</div>*/}

                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                {/*</div>*/}

                            </div>
                            <div>

                                <div className="backup-title">Roblox Game Design</div>
                                <div className="track-label-description">
                                    This track takes kids’ love (and obsession) with Roblox and uses it to teach the fundamentals of game design, digital art, and animation. Over the course of three seasons, participants will create different games in Roblox Studio, and along the way learn about 3D modeling and animation!                                </div>

                            </div>


                        </div>
                    </div>
                    <div className="track-photo roblox-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                <div className="full-track">
                    <div className="season-name">
                        FULL YEAR (September - June)
                    </div>
                </div>
                {this.getButtonsHTML("roblox")}

                <div className="track">
                    <div className={"track-line color" + " " + this.state.highlightTrack}>
                        {this.getSeasonHTML(0,"fall")}
                        {this.getProjectHTML(
                            10,
                            "3D",
                            "Modeling",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            20,
                            "Build Obstacle Courses",
                            "in Roblox Studio",
                            "fall"
                        )}


                        {this.getSeasonHTML(33,"winter")}
                        {this.getProjectHTML(
                            39,
                            "Principles of",
                            "Game Design",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            50,
                            "Game Genres",
                            "in Roblox Studio",
                            "winter"
                        )}

                        {this.getSeasonHTML(66,"spring")}
                        {this.getProjectHTML(
                            73,
                            "Principles of",
                            "Animation",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            80,
                            "Creating Animations",
                            "in Roblox Studio",
                            "spring"
                        )}

                    </div>
                </div>
            </div>
        )
    }

    renderFortnite() {
        return(
            <div className="new-track" id="fortnite-track">
                <div className="track-photos fortnite-color-color">
                    <div className="left-container">
                        {/*<div className="subway-icon color">*/}
                            {/*<div>F</div>*/}
                        {/*</div>*/}
                        <div id="fortnite-subway" className="subway-icon-image"></div>

                        <div className="under-track-title">Fortnite Gaming & Game Design</div>
                        {/*<div className="screen-time-section">*/}
                            {/*<div className="screen-time-icon-most"></div>*/}
                            {/*<div>50% Game Playing</div>*/}
                        {/*</div>*/}
                    </div>

                    <div className="season-photo" id="fortnite-fall">
                        <div className="inner-photo">
                            <div className="color-overlay">

                            </div>
                        </div>
                        <div className="photo-text">
                            Fall Project
                        </div>
                    </div>


                </div>
                <div className="track-info">

                    <div className="track-name">

                        <div className="track-label">

                            <div>

                                <div className="backup-title">Fortnite Gaming & Game Design</div>

                                <div className="track-label-description">
                                    Is Fortnite all your kid talks about? We designed this track to use their love of Fortnite to learn professional elements of game design! The season’s track combines a mix of playing Fornite with friends and learning how to design, 3D model and build their own games using the elements of Fortnite! Keep in mind that unlike our other tracks, this track is about 50% playing Fortnite.
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="track-photo roblox-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                {this.getButtonsHTML("fortnite")}
                <div className="track">
                    <div className={"track-line color" + " " + this.state.highlightTrack}>

                        {this.getSeasonHTML(0,"fall")}

                        {this.getProjectHTML(
                            9,
                            "Game Design &",
                            "Fortnite Strategy",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            20,
                            "Playing Fortnite",
                            "With Friends",
                            "fall"
                        )}

                        {this.getSeasonHTML(33,"winter")}
                        {this.getProjectHTML(
                            39,
                            "Build a Fortnite-",
                            "Style Video Game",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            55,
                            "Playing Fortnite",
                            "With Friends",
                            "winter"
                        )}

                        {this.getSeasonHTML(66,"spring")}
                        {this.getProjectHTML(
                            73,
                            "Fortnite-Style",
                            "3D Modeling",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            85,
                            "Playing Fortnite",
                            "With Friends",
                            "spring"
                        )}

                    </div>
                </div>
            </div>
        )
    }

    renderCoding() {
        return(
            <div className="new-track break-page" id="coding-track">
                <div className="track-photos coding-color">
                    <div className="left-container">
                        {/*<div className="subway-icon color">*/}
                            {/*<div>C</div>*/}
                        {/*</div>*/}
                        <div id="coding-subway" className="subway-icon-image"></div>
                        <div className="under-track-title">Raspberry Pi
                            & Python Coding</div>

                    </div>

                    <div className="season-photo" id="coding-fall">
                        <div className="inner-photo">
                            <div className="color-overlay">

                            </div>
                        </div>
                        <div className="photo-text">
                            Fall Project
                        </div>
                    </div>


                </div>
                <div className="track-info">

                    <div className="track-name">

                        <div className="track-label">

                            <div>
                                <div className="backup-title">Raspberry Pi
                                    & Python Coding</div>

                                <div className="track-label-description">
                                    We designed this track for kids that are passionate about learning to code! These seasons are all about using the new Raspberry Pi and coding in Python to complete fun projects! No prior coding knowledge is required and participants get to keep their Pi!
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="track-photo coding-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                {this.getButtonsHTML("coding")}
                <div className="track">
                    <div className={"track-line color" + " " + this.state.highlightTrack}>

                        {this.getSeasonHTML(0,"fall")}
                        {this.getProjectHTML(
                            10,
                            "Intro to the Raspberry",
                            "Pi & Python",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            25,
                            "Code a binary clock",
                            "using RGB LEDs",
                            "fall"
                        )}

                        {this.getSeasonHTML(33,"winter")}
                        {this.getProjectHTML(
                            39,
                            "Code a camera to",
                            "make animated GIFs",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            52,
                            "Code the Pi for",
                            "facial recognition(11-13 group only)",
                            "winter"
                        )}

                        {this.getSeasonHTML(66,"spring")}
                        {this.getProjectHTML(
                            70,
                            "Code a voice assistant",
                            "with custom skills",
                            "spring"
                        )}


                    </div>
                </div>
            </div>
        )
    }

    renderMinecraft() {
        return (
            <div className="new-track" id="minecraft-track">
                <div className="track-photos minecraft-color">
                    <div className="left-container">
                        {/*<div className="subway-icon color">*/}
                            {/*<div>M</div>*/}
                        {/*</div>*/}
                        <div id="minecraft-subway" className="subway-icon-image"></div>

                        <div className="under-track-title">Minecraft Makerspace</div>
                        {/*<div className="screen-time-section">*/}
                            {/*<div className="screen-time-icon"></div>*/}
                            {/*<div>Mix on/off-screen time</div>*/}
                        {/*</div>*/}
                    </div>

                    <div className="season-photo" id="minecraft-fall">
                        <div className="inner-photo">
                            <div className="color-overlay">

                            </div>
                        </div>
                        <div className="photo-text">
                            Fall Project
                        </div>
                    </div>


                </div>
                <div className="track-info">

                    <div className="track-name">

                        <div className="track-label">

                            <div>
                                <div className="backup-title">Minecraft Makerspace</div>

                                <div className="track-label-description">
                                    Minecraft has been one of our staple tools in introducing kids to technology. This track is the culmination of our years of experience and curriculum perfection around a variety of Minecraft topics. The seasons in this track cover an introduction to coding, 3D modeling and printing, electronic circuits, and logic-based puzzles. This track also is a great introduction to the Makerspace with projects utilizing the 3D printers, robots, and laser cutter!
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="track-photo minecraft-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                {this.getButtonsHTML("minecraft")}
                <div className="track">
                    <div className={"track-line color" + " " + this.state.highlightTrack}>

                        {this.getSeasonHTML(0,"fall")}

                        {this.getProjectHTML(
                            9,
                            "Level Design",
                            "& Adventure Maps",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            20,
                            "3D Modeling",
                            "& 3D Printing",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            27,
                            "Pixel Art Skins",
                            "& Texture Packs",
                            "fall"
                        )}

                        {this.getSeasonHTML(33,"winter")}
                        {this.getProjectHTML(
                            39,
                            "Logic, redstone",
                            "circuits and puzzles",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            50,
                            "LUA scripting a",
                            "\"turtle\" in Minecraft",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            58,
                            "Scripting a \"turtle\"",
                            "robot in real life",
                            "winter"
                        )}

                        {this.getSeasonHTML(66,"spring")}
                        {this.getProjectHTML(
                            73,
                            "Minecraft Mod",
                            "Art Design",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            90,
                            "Create a Minecraft Mod",
                            "of a custom block",
                            "spring"
                        )}

                    </div>
                </div>

            </div>
        )
    }

    renderHardware() {
        return (
            <div className="new-track break-page" id="hardware-track">
                <div className="track-photos hardware-color">
                    <div className="left-container">
                        {/*<div className="subway-icon color">*/}
                            {/*<div>X</div>*/}
                        {/*</div>*/}
                        <div id="hardware-subway" className="subway-icon-image"></div>

                        <div className="under-track-title slightly-less-line-height">Engineering
                            & Advanced
                            Makerspace</div>
                        {/*<div className="screen-time-section">*/}
                            {/*<div className="screen-time-icon-little"></div>*/}
                            {/*<div>Little screen time</div>*/}
                        {/*</div>*/}
                    </div>

                    <div className="season-photo" id="hardware-fall">
                        <div className="inner-photo">
                            <div className="color-overlay">

                            </div>
                        </div>
                        <div className="photo-text">
                            Fall Project
                        </div>
                    </div>


                </div>
                <div className="track-info">

                    <div className="track-name">

                        <div className="track-label">

                            <div>
                                <div className="backup-title">Engineering
                                    & Advanced
                                    Makerspace</div>

                                <div className="track-label-description">
                                    This advanced track is designed to introduce our older kids to the art and science of engineering and fabrication. Each season offers a new project that covers advanced Makerspace tools that are normally not accessible in the regular Makerspace!
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="track-photo hardware-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                {this.getButtonsHTML("hardware")}
                <div className="track">
                    <div className={"track-line color" + " " + this.state.highlightTrack}>

                        {this.getSeasonHTML(0,"fall")}
                        {this.getProjectHTML(
                            10,
                            "Advanced tools, safety,",
                            "and materials",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            20,
                            "Build a phone stand",
                            "out of wood & acrylic",
                            "fall"
                        )}

                        {this.getSeasonHTML(33,"winter")}
                        {this.getProjectHTML(
                            39,
                            "CAD & Engineering",
                            "Moving Parts",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            45,
                            "Laser cutting",
                            "gears",
                            "winter"
                        )}

                        {this.getProjectHTML(
                            55,
                            "Build a crazy",
                            "gumball machine",
                            "winter"
                        )}

                        {this.getSeasonHTML(66,"spring")}

                        {this.getProjectHTML(
                            70,
                            "Sculpt a custom",
                            "flash drive design",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            75,
                            "Mold & cast a custom",
                            "resin flash drive",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            85,
                            "Vacuuform custom" +
                            "packaging",
                            "spring"
                        )}

                    </div>
                </div>

            </div>
        )
    }

    renderVideo() {
        return (
            <div className="new-track" id="video-track">
                <div className="track-photos video-color">
                    <div className="left-container">
                        {/*<div className="subway-icon color">*/}
                            {/*<div>V</div>*/}
                        {/*</div>*/}
                        <div id="video-subway" className="subway-icon-image"></div>

                        <div className="under-track-title">Video Production & YouTube</div>
                        {/*<div className="screen-time-section">*/}
                            {/*<div className="screen-time-icon"></div>*/}
                            {/*<div>Mix on/off-screen time</div>*/}
                        {/*</div>*/}
                    </div>

                    <div className="season-photo" id="video-fall">
                        <div className="inner-photo">
                            <div className="color-overlay">

                            </div>
                        </div>
                        <div className="photo-text">
                            Fall Project
                        </div>
                    </div>


                </div>
                <div className="track-info">

                    <div className="track-name">

                        <div className="track-label">
                            {/*<div className="tag-section">*/}
                                {/*<div className="skills-section">*/}
                                    {/*<div className="offered-at">Skills covered in this track</div>*/}
                                    {/*<div className="list-of-skills video-color">*/}
                                        {/*<div className="skill">Cinematography</div>*/}
                                        {/*<div className="skill">YouTube</div>*/}
                                        {/*<div className="skill">Video Editing</div>*/}
                                        {/*<div className="skill">Stop-Motion</div>*/}
                                        {/*<div className="mini-course">Online Safety</div>*/}
                                        {/*<div className="age7to9">ages 7 - 9</div>*/}

                                    {/*</div>*/}

                                {/*</div>*/}
                                {/*<div className="options-section">*/}
                                    {/*<div className="location">*/}
                                        {/*<div className="offered-at">Offered in Brooklyn</div>*/}
                                        {/*<div className="ages-tags">*/}
                                            {/*<div className="age">*/}
                                                {/*<div className="age7to9 age-title">ages 7 - 9</div>*/}
                                                {/*<div className="age-group">*/}

                                                    {/*<div className="">Tue</div>*/}
                                                    {/*<div className="">Wed</div>*/}
                                                    {/*<div className="">Fri</div>*/}

                                                {/*</div>*/}

                                            {/*</div>*/}
                                            {/*<div className="age">*/}
                                                {/*<div className="age9to11 age-title">ages 9 - 11</div>*/}
                                                {/*<div className="age-group">*/}
                                                    {/*<div className="">Mon</div>*/}
                                                    {/*<div className="">Thu</div>*/}
                                                {/*</div>*/}

                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="location">*/}
                                        {/*<div className="offered-at">Offered in Tribeca</div>*/}
                                        {/*<div className="ages-tags">*/}
                                            {/*<div className="age">*/}
                                                {/*<div className="age7to9 age-title">ages 7 - 9</div>*/}
                                                {/*<div className="age-group">*/}

                                                    {/*<div className="">Tue</div>*/}
                                                    {/*<div className="">Wed</div>*/}
                                                    {/*<div className="">Fri</div>*/}

                                                {/*</div>*/}

                                            {/*</div>*/}
                                            {/*<div className="age">*/}
                                                {/*<div className="age9to11 age-title">ages 9 - 11</div>*/}
                                                {/*<div className="age-group">*/}
                                                    {/*<div className="">Mon</div>*/}
                                                    {/*<div className="">Thu</div>*/}
                                                {/*</div>*/}

                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                {/*</div>*/}

                            {/*</div>*/}
                            <div>
                                <div className="backup-title">Video Production & YouTube</div>

                                <div className="track-label-description">
                                    This track focuses exclusively on the digital arts with each season covering new elements and techniques for creating videos. Instead of just watching YouTube videos, kids in this track will learn how to make their own! Kids will learn how to record and edit live video, create motion graphics, effects, and music, and create stop-motion animations! This track also starts off with an important segment to teach kids how to be safe and courteous when online.
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="track-photo video-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                {this.getButtonsHTML("video")}
                <div className="track">
                    <div className={"track-line color" + " " + this.state.highlightTrack}>

                        {this.getSeasonHTML(0,"fall")}
                        {this.getProjectHTML(
                            5,
                            "*Online Safety and",
                            "Anti-Bullying",
                            "fall",
                            true
                        )}
                        {this.getProjectHTML(
                            9,
                            "Make a Let's Play Video",
                            "for YouTube",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            20,
                            "Branding and",
                            "Graphic Design",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            27,
                            "Video",
                            "Editing",
                            "fall"
                        )}

                        {this.getSeasonHTML(33,"winter")}
                        {this.getProjectHTML(
                            39,
                            "Motion Graphics",
                            "for Videos",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            46,
                            "Cinematography and",
                            "Camera Skills",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            58,
                            "Sound Effects",
                            "and Music Creation",
                            "winter"
                        )}

                        {this.getSeasonHTML(66,"spring")}
                        {this.getProjectHTML(
                            72,
                            "Draw with Disney's",
                            "Principles of Animation",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            80,
                            "Create Whiteboard and",
                            "Stop-Motion Animations",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            88,
                            "Add Audio to Videos",
                            "with Voice Acting",
                            "spring"
                        )}

                    </div>
                </div>
            </div>
        )
    }

    renderPC() {
        return (
            <div className="new-track" id="video-track">
                <div className="track-photos video-color">
                    <div className="left-container">
                        {/*<div className="subway-icon color">*/}
                            {/*<div>V</div>*/}
                        {/*</div>*/}
                        <div id="pc-subway" className="subway-icon-image"></div>

                        <div className="under-track-title">Video Production & YouTube</div>
                        <div className="screen-time-section">
                            <div className="screen-time-icon"></div>
                            <div>Mix on/off-screen time</div>
                        </div>
                    </div>

                    <div className="season-photo" id="video-fall">
                        <div className="inner-photo">
                            <div className="color-overlay">

                            </div>
                        </div>
                        <div className="photo-text">
                            Fall Project
                        </div>
                    </div>
                    <div className="season-photo" id="video-winter">
                        <div className="inner-photo">
                            <div className="color-overlay">
                            </div>
                        </div>
                        <div className="photo-text">
                            Winter Project
                        </div>
                    </div>
                    <div className="season-photo" id="video-spring">
                        <div className="inner-photo">
                            <div className="color-overlay">

                            </div>
                        </div>
                        <div className="photo-text">
                            Spring Project
                        </div>
                    </div>

                </div>
                <div className="track-info">

                    <div className="track-name">

                        <div className="track-label">
                            <div className="tag-section">
                                <div className="skills-section">
                                    <div className="offered-at">Skills covered in this track</div>
                                    <div className="list-of-skills video-color">
                                        <div className="skill">Cinematography</div>
                                        <div className="skill">YouTube</div>
                                        <div className="skill">Video Editing</div>
                                        <div className="skill">Stop-Motion</div>
                                        <div className="mini-course">Online Safety</div>
                                        <div className="age7to9">ages 7 - 9</div>

                                    </div>

                                </div>
                                <div className="options-section">
                                    <div className="location">
                                        <div className="offered-at">Offered in Brooklyn</div>
                                        <div className="ages-tags">
                                            <div className="age">
                                                <div className="age7to9 age-title">ages 7 - 9</div>
                                                <div className="age-group">

                                                    <div className="">Tue</div>
                                                    <div className="">Wed</div>
                                                    <div className="">Fri</div>

                                                </div>

                                            </div>
                                            <div className="age">
                                                <div className="age9to11 age-title">ages 9 - 11</div>
                                                <div className="age-group">
                                                    <div className="">Mon</div>
                                                    <div className="">Thu</div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="location">
                                        <div className="offered-at">Offered in Tribeca</div>
                                        <div className="ages-tags">
                                            <div className="age">
                                                <div className="age7to9 age-title">ages 7 - 9</div>
                                                <div className="age-group">

                                                    <div className="">Tue</div>
                                                    <div className="">Wed</div>
                                                    <div className="">Fri</div>

                                                </div>

                                            </div>
                                            <div className="age">
                                                <div className="age9to11 age-title">ages 9 - 11</div>
                                                <div className="age-group">
                                                    <div className="">Mon</div>
                                                    <div className="">Thu</div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div>
                                <div className="backup-title">Video Production & YouTube</div>

                                <div className="track-label-description">
                                    This track focuses exclusively on the digital arts with each season covering new elements and techniques for creating videos. Instead of just watching YouTube videos, kids in this track will learn how to make their own! Kids will learn how to record and edit live video, create motion graphics, effects, and music, and create stop-motion animations! This track also starts off with an important segment to teach kids how to be safe and courteous when online.
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="track-photo video-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                {this.getButtonsHTML("video")}
                <div className="track">
                    <div className={"track-line color" + " " + this.state.highlightTrack}>

                        {this.getSeasonHTML(0,"fall")}
                        {this.getProjectHTML(
                            5,
                            "*Online Safety and",
                            "Anti-Bullying",
                            "fall",
                            true
                        )}
                        {this.getProjectHTML(
                            9,
                            "Make a Let's Play Video",
                            "for YouTube",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            20,
                            "Branding and",
                            "Graphic Design",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            27,
                            "Video",
                            "Editing",
                            "fall"
                        )}

                        {this.getSeasonHTML(33,"winter")}
                        {this.getProjectHTML(
                            39,
                            "Motion Graphics",
                            "for Videos",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            46,
                            "Cinematography and",
                            "Camera Skills",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            58,
                            "Sound Effects",
                            "and Music Creation",
                            "winter"
                        )}

                        {this.getSeasonHTML(66,"spring")}
                        {this.getProjectHTML(
                            72,
                            "Draw with Disney's",
                            "Principles of Animation",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            80,
                            "Create Whiteboard and",
                            "Stop-Motion Animations",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            88,
                            "Add Audio to Videos",
                            "with Voice Acting",
                            "spring"
                        )}

                    </div>
                </div>
            </div>
        )
    }

    renderDeck() {
        return (
            <div className="new-track" id="deck-track">
                <div className="track-photos deck">
                    <div className="left-container">
                        {/*<div className="subway-icon color">*/}
                            {/*<div>D</div>*/}
                        {/*</div>*/}
                        <div id="deck-subway" className="subway-icon-image"></div>

                        <div className="under-track-title">Deck Design: MakerSKATE</div>

                    </div>

                    <div className="season-photo" id="deck-fall">
                        <div className="inner-photo">
                            <div className="color-overlay">

                            </div>
                        </div>
                        <div className="photo-text">
                            Fall Project
                        </div>
                    </div>


                </div>
                <div className="track-info">

                    <div className="track-name">

                        <div className="track-label">

                            <div>
                                <div className="backup-title">Deck Design: MakerSKATE</div>

                                <div className="track-label-description">
                                    This limited time track gives you a chance to design and build your own tricked-out skateboard deck! Starting from a blank deck, you will use woodworking, laser cutting, and electronics to create your own skateboard deck that features fiber optic lights, motion sensors, a digital display, and custom wheels! PLUS, you’ll get time to practice skating at nearby skate ramps and parks!
                                    <br></br>
                                    Due to the advanced topics and limited space, an application is required to take this topic. This is a full-year track with all materials included.
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="track-photo video-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                {this.getButtonsHTML("deck")}
                <div className="track">
                    <div className={"track-line color" + " " + this.state.highlightTrack}>

                        {this.getSeasonHTML(0,"fall")}
                        {this.getProjectHTML(
                            8,
                            "Deck design planning",
                            "& skating basics",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            15,
                            "Use drills and dremels",
                            "to prepare your deck",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            21,
                            "Mold and cast",
                            "custom urethane wheels",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            27,
                            "Field-test your",
                            "custom wheels",
                            "fall"
                        )}

                        {this.getSeasonHTML(33,"winter")}

                        {this.getProjectHTML(
                            39,
                            "Assemble Arduino sensors",
                            "& start soldering",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            52,
                            "Add code to control",
                            "the Arduino",
                            "winter"
                        )}

                        {this.getSeasonHTML(66,"spring")}
                        {this.getProjectHTML(
                            72,
                            "Assemble deck electronics",
                            "& fiber optics",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            80,
                            "Paint a design with laser",
                            "cut stencils and vinyl",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            88,
                            "Field-test your new",
                            "custom skateboard",
                            "spring"
                        )}

                    </div>
                </div>
            </div>
        )
    }


}

export default Track;
