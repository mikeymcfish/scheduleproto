import React, {Component} from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import CartIcon from './icons/CartIcon';
import $ from 'jquery';
import 'react-hint/css/index.css';
import ReactTooltip from 'react-tooltip';
import Badge from 'material-ui/Badge';
import Button from 'material-ui/Button';
import MakerspaceMonth from './MakerspaceMonth';


class MakerspaceSection extends React.Component {

    createMakerspaceMonth() {

    }

    createMakerspaceButton(e) {
        return (
            <div className="makerspace-button">
                {e.id}
            </div>
        );
    }

    createMakerspaceSection() {

        var makerspaceSection;
        for (var i = 0; i < this.props.events.length; i++) {
            makerspaceSection += this.createMakerspaceButton(this.props.events[i]);
        }
        return makerspaceSection;
    }

    render() {

        var makerdaysSept = [];
        var makerdaysOct = [];
        var makerdaysNov = [];
        var makerdaysDec = [];
        var makerdaysJan = [];
        var makerdaysFeb = [];
        var makerdaysMar = [];
        var makerdaysApr = [];
        var makerdaysMay = [];
        var makerdaysJune = [];
        for (var i = 0; i < this.props.events.length; i++) {
            switch (this.props.events[i].month) {
                case "September" :
                    makerdaysSept.push(this.props.events[i]);
                    break;
                case "October" :
                    makerdaysOct.push(this.props.events[i]);
                    break;
                case "November" :
                    makerdaysNov.push(this.props.events[i]);
                    break;
                case "December" :
                    makerdaysDec.push(this.props.events[i]);
                    break;
                case "January" :
                    makerdaysJan.push(this.props.events[i]);
                    break;
                case "February" :
                    makerdaysFeb.push(this.props.events[i]);
                    break;
                case "March" :
                    makerdaysMar.push(this.props.events[i]);
                    break;
                case "April" :
                    makerdaysApr.push(this.props.events[i]);
                    break;
                case "May" :
                    makerdaysMay.push(this.props.events[i]);
                    break;
                case "June" :
                    makerdaysJune.push(this.props.events[i]);
                    break;
                default:
                    break;
            }
            ;
        }

        return (
            <div className = "makerspace-section" >
                <div className="makerspace-description-section">
                    <div className="subway-icon maker">
                        ?
                    </div>
                    <div className="track-label-description">
                        <div className="maker-title">
                            Makerspace Projects (Single Day Visits)
                        </div>
                        <div className="tag-section">
                            <div className="skills-section">
                                <div className="list-of-skills maker-color">
                                    <div className="skill">3D Printing</div>
                                    <div className="skill">Laser Cutting</div>
                                    <div className="skill">DIY Projects</div>
                                    <div className="skill">Self-Guided Learning</div>
                                    <div className="skill">Daily Maker Challenges</div>
                                </div>
                            </div>
                        </div>
                        <div className="maker-copy">
                            Not sure what Track to start on? Want to just try a few days? Is your child more independent and just a need a little guidance?
                            Join our single-day Makerspace for activities using cutting-edge technology like 3D printers, laser cutters,
                            and programmable toys! During Workshop Time (4:00-5:30 PM), kids ages 7-14 can take on the Challenge of the Day (which includes a
                            brief STEM workshop), or take on bigger projects of their own imagination using the inspiring available tech around them.
                        </div>
                     </div>
                </div>


            < MakerspaceMonth
            month = "September"
            events = {makerdaysSept}
            monthNum = {9}
            homeRef = {this.props.thisRef}
            addToCart={this.props.addToCart}
            cart={this.props.cart}
            ownedEvents={this.props.ownedEvents}
        />
        <MakerspaceMonth
            month="October"
            events={makerdaysOct}
            monthNum={10}
            homeRef = {this.props.thisRef}
            addToCart={this.props.addToCart}
            cart={this.props.cart}
            ownedEvents={this.props.ownedEvents}
        />
        < MakerspaceMonth
            month = "November"
            events = {makerdaysNov}
            monthNum = {11}
            homeRef = {this.props.thisRef}
            addToCart={this.props.addToCart}
            cart={this.props.cart}
            ownedEvents={this.props.ownedEvents}
        />
        <MakerspaceMonth
            month="December"
            events={makerdaysDec}
            monthNum={12}
            homeRef = {this.props.thisRef}
            addToCart={this.props.addToCart}
            cart={this.props.cart}
            ownedEvents={this.props.ownedEvents}
        />
        < MakerspaceMonth
            month = "January"
            events = {makerdaysJan}
            monthNum = {1}
            homeRef = {this.props.thisRef}
            addToCart={this.props.addToCart}
            cart={this.props.cart}
            ownedEvents={this.props.ownedEvents}
        />
        <MakerspaceMonth
            month="February"
            events={makerdaysFeb}
            monthNum={2}
            homeRef = {this.props.thisRef}
            addToCart={this.props.addToCart}
            cart={this.props.cart}
            ownedEvents={this.props.ownedEvents}
        />
        < MakerspaceMonth
            month = "March"
            events = {makerdaysMar}
            monthNum = {3}
            homeRef = {this.props.thisRef}
            addToCart={this.props.addToCart}
            cart={this.props.cart}
            ownedEvents={this.props.ownedEvents}
        />
        <MakerspaceMonth
            month="April"
            events={makerdaysApr}
            monthNum={4}
            homeRef = {this.props.thisRef}
            addToCart={this.props.addToCart}
            cart={this.props.cart}
            ownedEvents={this.props.ownedEvents}
        />
        < MakerspaceMonth
            month = "May"
            events = {makerdaysMay}
            monthNum = {5}
            homeRef = {this.props.thisRef}
            addToCart={this.props.addToCart}
            cart={this.props.cart}
            ownedEvents={this.props.ownedEvents}
        />
        <MakerspaceMonth
            month="June"
            events={makerdaysJune}
            monthNum={6}
            homeRef = {this.props.thisRef}
            addToCart={this.props.addToCart}
            cart={this.props.cart}
            ownedEvents={this.props.ownedEvents}
        />
        </div>
    )

    }
}

export default MakerspaceSection;
