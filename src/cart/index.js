import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import Billing from './billing';
import Register from './register';

export default class extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
    }

    render() {
        // TODO: Authed and unauthed pages
        // TODO: Default cart page
        return (
            <div id="cart-container">
                <Switch>
                    <Route path={`${this.props.match.path}/billing`} component={ Billing } />
                    <Route path={`${this.props.match.path}/register`} component={ Register } />
                </Switch>
            </div>
        );
    }
}
