import React, {Component} from 'react';
import './webflow.css';
import './App.css';
import $ from 'jquery';

class TopLinks extends React.Component {


    constructor() {
        super();
        this.state = {
            loggedIn: false,
        };
        this.setLoggedIn = this.setLoggedIn.bind(this);


    }

    componentDidUpdate() {

    }

    setLoggedIn() {
        this.setState({
            loggedIn: true
        });
        this.props.onLogin(this.state.loggedIn);
    }

    render() {
        return (
            <div className="link-bar">
                <div className="version-number">
                    Pixel Scheduler v1.0.0
                </div>
                <div className="top-link">
                    sign up for membership
                </div>
                <div className="top-link" onClick={this.setLoggedIn}>
                    member log-in
                </div>

            </div>

        );
    }
}

export default TopLinks;
