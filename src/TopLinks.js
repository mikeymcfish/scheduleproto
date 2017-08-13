import React, {Component} from 'react';
import './webflow.css';
import './App.css';
import $ from 'jquery';

class TopLinks extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="link-bar">
                <div className="top-link">
                    member log-in
                </div>
                <div className="top-link">
                    sign up for membership
                </div>

            </div>

        );
    }
}

export default TopLinks;
