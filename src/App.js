import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router';

import './index.css';
import { fetchAuth } from './shared/auth/actions';
import TopLinks from './TopLinks';
import isLive from './isLive';
import Cart from './cart';
import Schedule from './schedule';

class App extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        fetchAuth: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.fetchAuth();
    }

    render() {
        const { auth } = this.props;

        if (!auth.loaded) {
            // TODO: Add a better loader
            return <div>loading...</div>;
        }

        return (
            <div className="App">
                { !isLive && <TopLinks /> }
                <div className="full-page-container">
                    <Switch>
                        { /* Add routes here */ }
                        <Route exact path="/" render={(props) => {
                            return <Schedule {...props} auth={ auth } />;
                        }} />
                        <Route path="/cart" render={(props) => {
                            return <Cart {...props} auth={ auth } />;
                        }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        auth: state.auth,
    }),
    dispatch => bindActionCreators({
        fetchAuth,
    }, dispatch)
)(App);