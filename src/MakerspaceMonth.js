import React, { Component } from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';
import 'react-hint/css/index.css';
import ReactTooltip from 'react-tooltip';
import Button from 'material-ui/Button';
import MakerspaceButton from './MakerspaceButton';

class MakerspaceMonth extends React.Component {

    render() {
        return (
            <div className="makerspace-month">
                <div className="makerspace-month-name">
                    {this.props.month}
                </div>
                <div className="makerspace-days-container">

                    {this.props.events.map(
                        function(name, index) {

                            //find if its owned

                            name.inCart = this.props.cart.indexOf(name.id)>=0;
                            name.doesOwn = this.props.ownedEvents.indexOf(name.id)>=0;
                            // console.log("MAKER-- " + this.props.cart);

                            return (
                                <MakerspaceButton
                                    key = {index}
                                    day = {name.day}
                                    spots = {name.spotsLeft}
                                    event = {name}
                                    doesOwn = {name.doesOwn}
                                    dayString = {this.props.monthNum + "/" + name.day}
                                    homeRef = {this.props.thisRef}
                                    addToCart={this.props.addToCart}
                                    cart={this.props.cart}
                                    isInCart = {name.inCart}
                                />
                            )

                        },this
                    )}
                </div>
            </div>
        );
    }

}

export default MakerspaceMonth;
