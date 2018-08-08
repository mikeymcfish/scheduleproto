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

    render() {
        if (this.props.topic=="Roblox") {
            return(this.renderRoblox())
        }
        if (this.props.topic=="Fortnite") {
            return(this.renderFortnite())
        }
        if (this.props.topic=="Minecraft") {
            return(this.renderMinecraft())
        }
        if (this.props.topic=="Coding") {
            return(this.renderCoding())
        }

        if (this.props.topic=="Video") {
            return(this.renderVideo())
        }
        if (this.props.topic=="Hardware") {
            return(this.renderHardware())
        }
        return (
            <div></div>
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
                            <div>
                                <div className="backup-title">Roblox Coding & Game Design</div>

                                <div className="track-label-description">
                                    This track takes kids' love (and obsession) with Roblox and uses it to teach the fundamentals of game design, coding, and digital art. Over the course of 3 seasons, participants will create three different games in Roblox Studio, and along the way learn about 3D modeling and even how to sell their games! This track also starts off with an important segment to teach kids how to be safe and courteous when playing Roblox with other kids online.
                                </div>

                            </div>
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

                <div className="bottom-container-new">
                    <div className="full-track-button">
                        <div className="add-to-text">
                            add full track to cart - (3 spots left)
                        </div>
                        <Button disabled color="primary" className="color">
                            <div><span className="price-text">old price - new price</span></div>
                        </Button>
                    </div>
                    <div className="seasons-button-container">
                        <div className="season-button fall-season">
                            <Button disabled color="primary" className="color">
                                <div><span className="price-text">SOLD OUT!</span></div>
                            </Button>
                        </div>
                        <div className="season-button fall-season">
                            <Button disabled color="primary" className="color">
                                <div><span className="price-text">SOLD OUT!</span></div>
                            </Button>
                        </div>
                        <div className="season-button fall-season">
                            <Button disabled color="primary" className="color">
                                <div><span className="price-text">SOLD OUT!</span></div>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="track">
                    <div className="track-line color">
                        <div className="season-start" style={{left: "0%"}}>

                        </div>
                        <div className="project-start" style={{left: "5%"}}>
                            <div className="project-name mini-course">
                                *Online Safety and<br></br>Anti-Bullying
                            </div>

                        </div>
                        <div className="project-start" style={{left: "9%"}}>
                            <div className="project-name">
                                3D Modeling<br></br>for Roblox
                            </div>

                        </div>
                        <div className="project-start" style={{left: "15%"}}>
                            <div className="project-name">
                                Build Obstacle Courses<br></br>in Roblox Studio
                            </div>

                        </div>


                        <div className="season-start" style={{left: "33%"}}>

                        </div>
                        <div className="project-start" style={{left: "39%"}}>
                            <div className="project-name">
                                Roblox<br></br>Monetization
                            </div>

                        </div>
                        <div className="project-start" style={{left: "50%"}}>
                            <div className="project-name">
                                Build Survival Games<br></br>in Roblox Studio
                            </div>

                        </div>


                        <div className="season-start" style={{left: "66%"}}>

            </div>
            <div className="project-start" style={{left: "73%"}}>
                        <div className="project-name">
                            Game Design<br></br>Patterns
                        </div>

                    </div>
                    <div className="project-start" style={{left: "80%"}}>
                        <div className="project-name">
                            Build A.I. Characters<br></br>in Roblox Studio
                        </div>

                    </div>



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
                            <div>
                                <div className="backup-title">Fortnite-Inspired Game Design</div>

                                <div className="track-label-description">
                                    Is Fortnite all your kid talks about? We designed this track to use their love of Fortnite to build advanced video games in Unity! The seasons in this track focus on designing, 3D modeling and building Unity games that replicate elements of Fortnite-- and sprinkle in some advanced technology like Virtual Reality and Augmented Reality apps! This track also starts off with a segment on how to recognize and stand up to bullies when playing multi-player games online.                    </div>
                            </div>
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

                        </div>
                    </div>
                    <div className="track-photo roblox-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                <div className="track">
                    <div className="track-line color">
                        <div className="season-start" style={{left: "0px"}}>

                        </div>
                        <div className="project-start" style={{left: "5%"}}>
                            <div className="project-name mini-course">
                                *Online Safety and<br></br>Anti-Bullying
                            </div>

                        </div>
                        <div className="project-start" style={{left: "9%"}}>
                            <div className="project-name">
                                Game Design &<br></br>Fortnite Strategy
                            </div>

                        </div>
                        <div className="project-start" style={{left: "15%"}}>
                            <div className="project-name">
                                Build a Virtual Reality<br></br>Fortnite-Style World
                            </div>

                        </div>


                        <div className="season-start" style={{left: "33%"}}>

                        </div>
                        <div className="project-start" style={{left: "39%"}}>
                            <div className="project-name">
                                Build a Fortnite-<br></br>Style Video Game
                            </div>

                        </div>


                        <div className="season-start" style={{left: "66%"}}>

                        </div>
                        <div className="project-start" style={{left: "73%"}}>
                            <div className="project-name">
                                Fortnite-Style<br></br>3D Modeling
                            </div>

                        </div>
                        <div className="project-start" style={{left: "80%"}}>
                            <div className="project-name">
                                Build a Battlebus<br></br>AR Mobile Game
                            </div>

                        </div>



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
                            <div>
                                <div className="backup-title">Advanced Coding</div>

                                <div className="track-label-description">
                                    We designed this track for kids that are passionate about learning to code! These seasons have specific, super-fun, games that participants will code in Java (Android Studio) or in or Python. With a focus on the future, we cover everything from Alexa skill coding to augmented reality apps and facial recognition! No prior coding knowledge is required.                    </div>
                            </div>
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

                        </div>
                    </div>
                    <div className="track-photo coding-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                <div className="track">
                    <div className="track-line color">
                        <div className="season-start" style={{left: "0px"}}>

                        </div>
                        <div className="project-start" style={{left: "5%"}}>
                            <div className="project-name">
                                Code a mobile game using<br></br>Java and Android Studio
                            </div>

                        </div>
                        <div className="project-start" style={{left: "22%"}}>
                            <div className="project-name">
                                Code an Alexa Skill<br></br>Quiz Game
                            </div>

                        </div>


                        <div className="season-start" style={{left: "33%"}}>

                        </div>
                        <div className="project-start" style={{left: "39%"}}>
                            <div className="project-name">
                                Code an AR Game using<br></br>Java and Android Studio                </div>
                        </div>
                        <div className="season-start" style={{left: "66%"}}>

                        </div>
                        <div className="project-start" style={{left: "73%"}}>
                            <div className="project-name">
                                Code a Cryptocurrency<br></br>in Ethereum
                            </div>

                        </div>
                        <div className="project-start" style={{left: "80%"}}>
                            <div className="project-name">
                                Code an Encryption Program<br></br>in Python
                            </div>
                        </div>
                        <div className="project-start" style={{left: "90%"}}>
                            <div className="project-name">
                                Code a Facial<br></br>Recognition Program
                            </div>
                        </div>

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
                            <div>
                                <div className="backup-title">Minecraft Coding & Game Design</div>

                                <div className="track-label-description">
                                    Minecraft has been one of our staple tools in introducing kids to technology. This track is the culmination of our years of experience and curriculum perfection around a variety of Minecraft topics. The seasons in this track cover an introduction to coding in LUA and Java, 3D modeling and printing, building electronic circuits, and creating logic-based puzzles using redstone in Minecraft! This track also starts off with an important segment to teach kids how to be safe and courteous when playing Minecraft with other kids online.
                                </div>
                            </div>
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

                        </div>
                    </div>
                    <div className="track-photo minecraft-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                <div className="track">
                    <div className="track-line color">
                        <div className="season-start" style={{left: "0px"}}>

                        </div>
                        <div className="project-start" style={{left: "5%"}}>
                            <div className="project-name mini-course">
                                *Online Safety and<br></br>Anti-Bullying
                            </div>

                        </div>
                        <div className="project-start" style={{left: "9%"}}>
                            <div className="project-name">
                                Level Design<br></br>
                                & Adventure Maps
                            </div>

                        </div>
                        <div className="project-start" style={{left: "20%"}}>
                            <div className="project-name">
                                3D Modeling <br></br>
                                & 3D Printing
                            </div>

                        </div>
                        <div className="project-start" style={{left: "27%"}}>
                            <div className="project-name">
                                Pixel Art Skins <br></br>
                                & Texture Packs
                            </div>

                        </div>




                        <div className="season-start" style={{left: "33%"}}>

                        </div>
                        <div className="project-start" style={{left: "40%"}}>
                            <div className="project-name">
                                Basic electronics<br></br>and circuit design
                            </div>

                        </div>
                        <div className="project-start" style={{left: "50%"}}>
                            <div className="project-name">
                                Boolean logic, redstone<br></br>
                                circuits and puzzles
                            </div>

                        </div>
                        <div className="project-start" style={{left: "58%"}}>
                            <div className="project-name">
                                LUA scripting<br></br>
                                in Minecraft
                            </div>

                        </div>





                        <div className="season-start" style={{left: "66%"}}>

                        </div>
                        <div className="project-start" style={{left: "73%"}}>
                            <div className="project-name">
                                Minecraft Modding<br></br>
                                using Java
                            </div>

                        </div>



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
                            <div>
                                <div className="backup-title">Hardware Hacking & Electrical Engineering</div>

                                <div className="track-label-description">
                                    This advanced track is designed to introduce our older kids to the art and science of electrical engineering. Each season offers a new perspective on designing and coding circuits, starting with our highly anticipated project to build, code, and solder an accessory that hacks an Xbox controller! No prior soldering knowledge is required.                    </div>
                            </div>
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

                        </div>
                    </div>
                    <div className="track-photo hardware-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                <div className="track">
                    <div className="track-line color">
                        <div className="season-start" style={{left: "0px"}}>

                        </div>
                        <div className="project-start" style={{left: "5%"}}>
                            <div className="project-name">
                                Learn to solder and use<br></br>a multi-meter
                            </div>
                        </div>
                        <div className="project-start" style={{left: "10%"}}>
                            <div className="project-name">
                                Solder a micro<br></br>game controller
                            </div>

                        </div>
                        <div className="project-start" style={{left: "15%"}}>
                            <div className="project-name">
                                Hack an Xbox controller<br></br>
                                to add mods and macros
                            </div>

                        </div>


                        <div className="season-start" style={{left: "33%"}}>

                        </div>
                        <div className="project-start" style={{left: "39%"}}>
                            <div className="project-name">
                                Build a Remote-Control<br></br>Tank Toy that shoots
                            </div>

                        </div>
                        <div className="season-start" style={{left: "66%"}}>

                        </div>
                        <div className="project-start" style={{left: "71%"}}>
                            <div className="project-name">
                                Mod and Upgrade<br></br>a Gaming PC
                            </div>
                        </div>
                        <div className="project-start" style={{left: "76%"}}>
                <div className="project-name">
                    Build a giant multi-<br></br>player arcade game
                </div>
            </div>

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
                            <div>
                                <div className="backup-title">Video Production & YouTube</div>

                                <div className="track-label-description">
                                    This track focuses exclusively on the digital arts with each season covering new elements and techniques for creating videos. Instead of just watching YouTube videos, kids in this track will learn how to make their own! Kids will learn how to record and edit live video, create motion graphics, effects, and music, and create stop-motion animations! This track also starts off with an important segment to teach kids how to be safe and courteous when online.
                                </div>
                            </div>
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

                        </div>
                    </div>
                    <div className="track-photo video-fall">

                    </div>
                    <div className="track-details">
                    </div>

                </div>
                <div className="track">
                    <div className="track-line color">
                        <div className="season-start" style={{left: "0px"}}>

                        </div>
                        <div className="project-start" style={{left: "5%"}}>
                            <div className="project-name mini-course">
                                *Online Safety and<br></br>Anti-Bullying
                            </div>

                        </div>
                        <div className="project-start" style={{left: "9%"}}>
                            <div className="project-name">
                                Make a Let's Play Video<br></br>for YouTube
                            </div>

                        </div>
                        <div className="project-start" style={{left: "19%"}}>
                            <div className="project-name">
                                Branding and<br></br>Graphic Design
                            </div>
                        </div>
                        <div className="project-start" style={{left: "26%"}}>
                            <div className="project-name">
                                Video<br></br>
                                Editing
                            </div>
                        </div>


                        <div className="season-start" style={{left: "33%"}}>

                        </div>
                        <div className="project-start" style={{left: "39%"}}>
                            <div className="project-name">
                                Motion Graphics<br></br>for Videos
                            </div>
                        </div>

                        <div className="project-start" style={{left: "46%"}}>
                            <div className="project-name">
                                Cinematography and<br></br>Camera Skills
                            </div>

                        </div>
                        <div className="project-start" style={{left: "58%"}}>
                            <div className="project-name">
                                Sound Effects<br></br>and Music Creation
                            </div>

                        </div>

                        <div className="season-start" style={{left: "66%"}}>

                        </div>
                        <div className="project-start" style={{left: "72%"}}>
                            <div className="project-name">
                                Draw with Disney's<br></br>Principles of Animation
                            </div>
                        </div>
                        <div className="project-start" style={{left: "80%"}}>
                            <div className="project-name">
                                Create Whiteboard and<br></br>Stop-Motion Animations
                            </div>
                        </div>
                        <div className="project-start" style={{left: "90%"}}>
                            <div className="project-name">
                                Add Audio to Videos<br></br>with Voice Acting
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}




export default Track;
