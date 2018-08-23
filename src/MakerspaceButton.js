import React, { Component } from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';
import 'react-hint/css/index.css';
import ReactTooltip from 'react-tooltip';
import Button from 'material-ui/Button';


class MakerspaceButton extends React.Component {

    constructor() {
        super();
        this.handleAddToCart = this.handleAddToCart.bind(this);

    }

    handleAddToCart() {
        this.props.addToCart(this.props.event);
        // console.log
    }

    render() {
        return (
            <div className={this.props.isInCart? "in-cart-2 makerspace-button" : "makerspace-button"}>


                {

                    this.props.doesOwn ?


                        <div
                            className="owned-maker"
                            data-event-id={this.props.event.id}
                        >
                            {/*<Button color="primary" className="day-button" >*/}
                                <div className="">
                                    {this.props.dayString}
                                </div>
                            {/*</Button>*/}
                            <div className="add-to-text">purchased</div>

                        </div>


                    :
                    this.props.spots>0?

                        <div
                            onClick ={this.handleAddToCart.bind()}
                            data-event-id={this.props.event.id}
                            className="dont-add-in-cart"
                        >
                            <Button color="primary" className="day-button" >
                                <div className="">
                                    {this.props.dayString}
                                </div>
                            </Button>
                            <div className="add-to-text">{this.props.spots} spots left</div>

                        </div>
                        :

                        <div
                            className={"sold-out-event"}
                            data-event-id={this.props.event.id}
                        >
                            <Button disabled color="primary" className="color">
                                <div className="">
                                    {this.props.dayString}
                                </div>
                            </Button>
                            <div className="add-to-text">unavailable</div>

                        </div>


                }

            </div>

            )

    }



}

export default MakerspaceButton;
