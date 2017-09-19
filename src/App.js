import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router';

import './index.css';
import { fetchAuth } from './shared/auth/actions';
import { fetchMembers } from './data/member/actions';
import TopLinks from './TopLinks';
import isLive from './isLive';
import Cart from './cart';
import Schedule from './schedule';
import './styles/general.css';

class App extends Component {

    static propTypes = {
        fetchAuth: PropTypes.func.isRequired,
        fetchMembers: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        members: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.props.fetchAuth()
            .then(() => {
                this.props.fetchMembers();
            })
    }

    render() {
        const { auth, members } = this.props;

        if (!auth.loaded || !members.loaded) {
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
                            return <Schedule auth={ auth } members={ members } />;
                        }} />
                        <Route path="/cart" render={() => {
                            return <Cart auth={ auth } members={ members } />;
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
        members: state.data.members,
    }),
    dispatch => bindActionCreators({
        fetchAuth,
        fetchMembers,
    }, dispatch)
)(App);