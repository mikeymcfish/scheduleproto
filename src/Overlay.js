import React, { Component } from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';


class Overlay extends React.Component {
    constructor() {
        super()
    }

    render() {

        return (
            <div style={{width: '100%'}} data-month={this.props.month} data-dayNum={this.props.value}>
                <div className="day-overlay">
                    {this.props.title}
                </div>
            </div>
        );
    }
}

export default Overlay;
