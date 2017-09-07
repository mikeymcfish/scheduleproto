import React, { Component } from 'react';
import { Route } from 'react-router';

import Billing from './billing';

export default class extends Component {
    render() {
        return <Route path={`${this.props.match.path}/billing`} component={ Billing } />;
    }
}
