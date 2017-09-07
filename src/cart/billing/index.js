import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Cart from './../sidebar';

class Index extends Component {

    static propTypes = {};

    componentDidMount() {
        // Async actions here
    }

    render() {
        return (
            <div className="container">

                {/* Payment Options */}
                <div>
                    <div>How do you want to pay?</div>
                    <div>
                        <button>Pay Now</button>
                        <button>Finance with Affirm</button>
                    </div>
                </div>

                {/* Cart */}
                <div>
                    <Cart />
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => bindActionCreators({}, dispatch)
)(Index);