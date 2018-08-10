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



}

    handleAddToCart() {


        //find whichever states are true and add those
        if (this.state.fall) {
            this.setState({
                fallInCart: true
            });
            this.props.addToCart(this.props.fallEvent);
            console.log("CART-X-adding-FALL");

        }
        if (this.state.winter) {
            this.setState({
                winterInCart: true
            });
            this.props.addToCart(this.props.winterEvent);
            console.log("CART-X-adding-WINTER");

        }
        if (this.state.spring) {
            this.setState({
                springInCart: true
            });
            this.props.addToCart(this.props.springEvent);
            console.log("CART-X-adding-SPRING");

        }

        // this.setState({
        //     inCart: true
        // });
        // this.props.addToCart(event);

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
        return (
            <div></div>
        )

    }

    getFullTrackText() {

        if (this.state.fallInCart && this.state.winterInCart && this.state.springInCart) {
            return (
                <div className="price-text button-price-container">
                    FULL SEASON IN CART
                </div>
            );
        } else {

            return (
                <div className="price-text button-price-container">
                    <div className="button-left-container">
                        <div className="">full track</div>
                    </div>
                    <div className="button-right-container">
                        <div className="">${this.props.trackPrice}</div>
                        <div classname="">save ${this.props.originalPrice - this.props.trackPrice}!</div>
                    </div>
                </div>
            );

        }
    }

    getFallText() {

        if (this.state.fallInCart) {
            return (
                <div className="price-text button-price-container">
                    FALL SEASON IN CART
                </div>
            );
        } else {

            return (
                <div className="price-text button-price-container">
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
                <div className="price-text button-price-container">
                    WINTER SEASON IN CART
                </div>
            );
        } else {

            return (
                <div className="price-text button-price-container">
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
                <div className="price-text button-price-container">
                    SPRING SEASON IN CART
                </div>
            );
        } else {

            return (
                <div className="price-text button-price-container">
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

    getProjectHTML(left, description_line1, description_line2="", season, isMini=false) {
        var showOrHideTest = false;
        if (season=="fall") {
            showOrHideTest = !this.state.fall;
        } else if (season=="winter") {
            showOrHideTest = !this.state.winter;
        } else if (season=="spring") {
            showOrHideTest = !this.state.spring;
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
                <div
                    className= {
                        (this.state.fallInCart && this.state.winterInCart && this.state.springInCart)?
                            "full-track-button in-cart-2"
                            :
                            "full-track-button"
                    }
                    onMouseEnter={this.highlightFullTrack.bind()} onMouseLeave={this.removeAllHighlights.bind()} onClick ={this.handleAddToCart.bind()}>
                    {/*
                        <div className="add-to-text">
                            add full track to cart - (3 spots left)
                        </div>
                        */}
                    <Button disabled color="primary" className="color">
                        <div>{this.getFullTrackText()}</div>
                    </Button>
                </div>
                <div className="seasons-button-container">
                    <div className={this.state.fallInCart? "season-button fall-season in-cart-2" : "season-button fall-season"}
                         onMouseEnter={this.changeFallHighlight.bind()} onMouseLeave={this.removeAllHighlights.bind()} onClick ={this.handleAddToCart.bind()}>
                        <Button disabled color="primary" className="color" >
                            {this.getFallText()}
                        </Button>
                        <div className="add-to-text">{this.props.fallSpots} spots left</div>

                    </div>
                    <div className={this.state.winterInCart? "season-button winter-season in-cart-2" : "season-button winter-season "}
                         onMouseEnter={this.changeWinterHighlight.bind()} onMouseLeave={this.removeAllHighlights.bind()} onClick ={this.handleAddToCart.bind()}>
                        <Button disabled color="primary" className="color">
                            <div>{this.getWinterText()}</div>
                        </Button>
                        <div className="add-to-text">{this.props.winterSpots} spots left</div>
                    </div>
                    <div className={this.state.springInCart? "season-button spring-season in-cart-2" : "season-button spring-season "}
                         onMouseEnter={this.changeSpringHighlight.bind()} onMouseLeave={this.removeAllHighlights.bind()} onClick ={this.handleAddToCart.bind()}>
                        <Button disabled color="primary" className="color">
                            <div>{this.getSpringText()}</div>
                        </Button>
                        <div className="add-to-text">{this.props.springSpots} spots left</div>

                    </div>
                </div>
            </div>
        )
    }

    renderRoblox() {
        return(
            <div className="first-track break-page" id="roblox-track">

                <div className="track-photos roblox-color">
                    <div className="left-container">
                        <div className="subway-icon color">
                            <div>R</div>
                        </div>
                        <div className="under-track-title">Roblox Coding & Game Design</div>
                        <div className="screen-time-section">
                            <div className="screen-time-icon-most"></div>
                            <div>Mostly on-screen time</div>
                        </div>
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
                    <div className="season-photo" id="roblox-winter">
                        <div className="inner-photo">
                            <div className="color-overlay">
                            </div>
                        </div>
                        <div className="photo-text">
                            Winter Project
                        </div>
                    </div>
                    <div className="season-photo" id="roblox-spring">
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

                                    <div className="list-of-skills roblox-color">
                                        <div className="skill">3D Modeling</div>
                                        <div className="skill">Game Design</div>
                                        <div className="skill">LUA</div>
                                        <div className="skill">Roblox Studio</div>
                                        <div className="online-safety-tag">Online Safety</div>
                                        <div className="age7to9">ages 7 - 9</div>
                                        <div className="age9to11">ages 9 - 11</div>

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

                                <div className="backup-title">Roblox Coding & Game Design</div>
                                <div className="track-label-description">
                                    This track takes kids' love (and obsession) with Roblox and uses it to teach the fundamentals of game design, coding, and digital art. Over the course of 3 seasons, participants will create three different games in Roblox Studio, and along the way learn about 3D modeling and even how to sell their games! This track also starts off with an important segment to teach kids how to be safe and courteous when playing Roblox with other kids online.
                                </div>

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
                            4,
                            "*Online Safety and",
                            "Anti-Bullying",
                            "fall",
                            true
                        )}
                        {this.getProjectHTML(
                            9,
                            "3D Modeling",
                            "for Roblox",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            15,
                            "Build Obstacle Courses",
                            "in Roblox Studio",
                            "fall"
                        )}

                        {this.getSeasonHTML(33,"winter")}
                        {this.getProjectHTML(
                            39,
                            "Roblox",
                            "Monetization",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            50,
                            "Build Survival Games",
                            "in Roblox Studio",
                            "winter"
                        )}

                        {this.getSeasonHTML(66,"spring")}
                        {this.getProjectHTML(
                            73,
                            "Game Design",
                            "Patterns",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            80,
                            "Build A.I. Characters",
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
                        <div className="subway-icon color">
                            <div>F</div>
                        </div>
                        <div className="under-track-title">Fortnite-Inspired Game Design</div>
                        <div className="screen-time-section">
                            <div className="screen-time-icon-most"></div>
                            <div>Mostly on-screen time</div>
                        </div>
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
                    <div className="season-photo" id="fortnite-winter">
                        <div className="inner-photo">
                            <div className="color-overlay">
                            </div>
                        </div>
                        <div className="photo-text">
                            Winter Project
                        </div>
                    </div>
                    <div className="season-photo" id="fortnite-spring">
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

                                    <div className="list-of-skills fortnite-color">
                                        <div className="skill">3D Modeling</div>
                                        <div className="skill">C#</div>
                                        <div className="skill">Unity</div>
                                        <div className="skill">Virtual Reality</div>
                                        <div className="skill">Augmented Reality</div>
                                        <div className="online-safety-tag">Online Safety</div>
                                        <div className="age9to11">ages 9 - 11</div>
                                        <div className="age12to14">ages 12 - 14</div>

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

                                <div className="backup-title">Fortnite-Inspired Game Design</div>

                                <div className="track-label-description">
                                    Is Fortnite all your kid talks about? We designed this track to use their love of Fortnite to build advanced video games in Unity! The seasons in this track focus on designing, 3D modeling and building Unity games that replicate elements of Fortnite-- and sprinkle in some advanced technology like Virtual Reality and Augmented Reality apps! This track also starts off with a segment on how to recognize and stand up to bullies when playing multi-player games online.                    </div>
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
                            5,
                            "*Online Safety and",
                            "Anti-Bullying",
                            "fall",
                            true
                        )}
                        {this.getProjectHTML(
                            9,
                            "Game Design &",
                            "Fortnite Strategy",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            15,
                            "Build a Virtual Reality",
                            "Fortnite-Style World",
                            "fall"
                        )}

                        {this.getSeasonHTML(33,"winter")}
                        {this.getProjectHTML(
                            39,
                            "Build a Fortnite-",
                            "Style Video Game",
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
                            80,
                            "Build a 'Battlebus'",
                            "AR Mobile Game",
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
                        <div className="subway-icon color">
                            <div>C</div>
                        </div>
                        <div className="under-track-title">Advanced Coding</div>
                        <div className="screen-time-section">
                            <div className="screen-time-icon-most"></div>
                            <div>Mostly on-screen time</div>
                        </div>
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
                    <div className="season-photo" id="coding-winter">
                        <div className="inner-photo">
                            <div className="color-overlay">
                            </div>
                        </div>
                        <div className="photo-text">
                            Winter Project
                        </div>
                    </div>
                    <div className="season-photo" id="coding-spring">
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
                                    <div className="list-of-skills coding-color">
                                        <div className="skill">Java</div>
                                        <div className="skill">Python</div>
                                        <div className="skill">Android Studio</div>
                                        <div className="skill">Machine Learning</div>
                                        <div className="skill">Alexa Skills</div>
                                        <div className="skill">Encryption</div>
                                        <div className="online-safety-tag">Online Safety</div>
                                        <div className="age9to11">ages 9 - 11</div>
                                        <div className="age12to14">ages 12 - 14</div>

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
                                <div className="backup-title">Advanced Coding</div>

                                <div className="track-label-description">
                                    We designed this track for kids that are passionate about learning to code! These seasons have specific, super-fun, games that participants will code in Java (Android Studio) or in or Python. With a focus on the future, we cover everything from Alexa skill coding to augmented reality apps and facial recognition! No prior coding knowledge is required.                    </div>
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
                            5,
                            "Code a mobile game using",
                            "Java and Android Studio",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            22,
                            "Code an Alexa Skill",
                            "Quiz Game",
                            "fall"
                        )}

                        {this.getSeasonHTML(33,"winter")}
                        {this.getProjectHTML(
                            39,
                            "Code an AR Game using",
                            "Java and Android Studio",
                            "winter"
                        )}

                        {this.getSeasonHTML(66,"spring")}
                        {this.getProjectHTML(
                            73,
                            "Code a Cryptocurrency",
                            "in Ethereum",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            80,
                            "Code an Encryption Program'",
                            "in Python",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            90,
                            "Code a Facial",
                            "Recognition Program",
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
                        <div className="subway-icon color">
                            <div>M</div>
                        </div>
                        <div className="under-track-title">Minecraft Coding & Game Design</div>
                        <div className="screen-time-section">
                            <div className="screen-time-icon"></div>
                            <div>Mix on/off-screen time</div>
                        </div>
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
                    <div className="season-photo" id="minecraft-winter">
                        <div className="inner-photo">
                            <div className="color-overlay">
                            </div>
                        </div>
                        <div className="photo-text">
                            Winter Project
                        </div>
                    </div>
                    <div className="season-photo" id="minecraft-spring">
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

                                    <div className="list-of-skills minecraft-color">
                                        <div className="skill">3D Modeling</div>
                                        <div className="skill">Javascript</div>
                                        <div className="skill">LUA</div>
                                        <div className="skill">Java</div>
                                        <div className="skill">Digital Art</div>
                                        <div className="skill">3D Printing</div>
                                        <div className="skill">Electronics</div>
                                        <div className="online-safety-tag">Online Safety</div>
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
                                <div className="backup-title">Minecraft Coding & Game Design</div>

                                <div className="track-label-description">
                                    Minecraft has been one of our staple tools in introducing kids to technology. This track is the culmination of our years of experience and curriculum perfection around a variety of Minecraft topics. The seasons in this track cover an introduction to coding in LUA and Java, 3D modeling and printing, building electronic circuits, and creating logic-based puzzles using redstone in Minecraft! This track also starts off with an important segment to teach kids how to be safe and courteous when playing Minecraft with other kids online.
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
                            5,
                            "*Online Safety and",
                            "Anti-Bullying",
                            "fall",
                            true
                        )}
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
                            "Basic electronics",
                            "and circuit design",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            50,
                            "Boolean logic, redstone",
                            "circuits and puzzles",
                            "winter"
                        )}
                        {this.getProjectHTML(
                            58,
                            "LUA scripting",
                            "in Minecraft",
                            "winter"
                        )}

                        {this.getSeasonHTML(66,"spring")}
                        {this.getProjectHTML(
                            73,
                            "Minecraft Modding",
                            "using Java",
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
                        <div className="subway-icon color">
                            <div>X</div>
                        </div>
                        <div className="under-track-title slightly-less-line-height">Hardware Hacking & Electrical Engineering</div>
                        <div className="screen-time-section">
                            <div className="screen-time-icon-little"></div>
                            <div>Little screen time</div>
                        </div>
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
                    <div className="season-photo" id="hardware-winter">
                        <div className="inner-photo">
                            <div className="color-overlay">
                            </div>
                        </div>
                        <div className="photo-text">
                            Winter Project
                        </div>
                    </div>
                    <div className="season-photo" id="hardware-spring">
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
                                    <div className="list-of-skills hardware-color">
                                        <div className="skill">Electronics</div>
                                        <div className="skill">Soldering</div>
                                        <div className="skill">Engineering</div>
                                        <div className="skill">PC Upgrading</div>
                                        <div className="age12to14">ages 12 - 14</div>

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
                                <div className="backup-title">Hardware Hacking & Electrical Engineering</div>

                                <div className="track-label-description">
                                    This advanced track is designed to introduce our older kids to the art and science of electrical engineering. Each season offers a new perspective on designing and coding circuits, starting with our highly anticipated project to build, code, and solder an accessory that hacks an Xbox controller! No prior soldering knowledge is required.                    </div>
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
                            5,
                            "Learn to solder and use",
                            "a multi-meter",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            10,
                            "Solder a micro",
                            "game controller",
                            "fall"
                        )}
                        {this.getProjectHTML(
                            15,
                            "Hack an Xbox controller",
                            "to add mods and macros",
                            "fall"
                        )}

                        {this.getSeasonHTML(33,"winter")}
                        {this.getProjectHTML(
                            39,
                            "Build a Remote-Control",
                            "Tank Toy and Game",
                            "winter"
                        )}

                        {this.getSeasonHTML(66,"spring")}
                        {this.getProjectHTML(
                            71,
                            "Mod and Upgrade",
                            "a Gaming PC",
                            "spring"
                        )}
                        {this.getProjectHTML(
                            76,
                            "Build a giant multi",
                            "player arcade game",
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
                        <div className="subway-icon color">
                            <div>V</div>
                        </div>
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

}

export default Track;
