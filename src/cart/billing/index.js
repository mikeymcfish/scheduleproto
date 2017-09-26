import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Cart from './../sidebar';

class Index extends Component {

    static propTypes = {}

    state = {
        showPayNow: false,
    }

    togglePayNow = () => {
        this.setState({ showPayNow: !this.state.showPayNow });
    }

    payNow(visible) {
        if (!visible) {
            return null;
        }

        return <div>pay now</div>;
    }

    render() {
        return (
            <div id="billing-container">

                {/* Payment Options */}
                <div>
                    { this.payNow(this.state.showPayNow) }
                    {/* We should render into this container (pay now / select payment / etc )*/}
                    <div>How do you want to pay?</div>
                    <div>
                        <button onClick={ this.togglePayNow }>Pay Now</button>
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