import React, {Component} from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import CartIcon from './icons/CartIcon';
import $ from 'jquery';

class Modal extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                {/*<button className="bx--btn bx--btn--primary" type="button" data-modal-target={"#"+this.props.modalid}>Test</button>*/}

                <div data-modal id={this.props.modalid} className="bx--modal" tabindex="-1"

                >
                    <div className="bx--modal-container"

                    >
                        <div className="bx--modal-header">
                            <h4 className="bx--modal-header__label">{this.props.type + " with ID: " + this.props.eventId}</h4>
                            <h2 className="bx--modal-header__heading">{this.props.title}</h2>
                            <button className="bx--modal-close" type="button" data-modal-close>
                                <svg className="bx--modal-close__icon" width="10" height="10" viewBox="0 0 10 10"
                                     fill-rule="evenodd">
                                    <path
                                        d="M9.8 8.6L8.4 10 5 6.4 1.4 10 0 8.6 3.6 5 .1 1.4 1.5 0 5 3.6 8.6 0 10 1.4 6.4 5z"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="bx--modal-content">
                            <p>{this.props.description}</p>
                        </div>

                        <div className="bx--modal-footer">
                            <button className="bx--btn bx--btn--secondary" type="button" data-modal-close>Cancel
                            </button>
                            <button className="bx--btn bx--btn--primary" type="button" data-modal-primary>Add
                                for {"" + this.props.price}</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Modal;
