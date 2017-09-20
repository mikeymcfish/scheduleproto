import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListItem from './item';

import { fetchCart } from './../../data/cart/actions';
import { fetchScheduleData } from './../../data/scheduler/actions';

class Sidebar extends Component {

    static propTypes = {
        fetchCart: PropTypes.func.isRequired,
        fetchScheduleData: PropTypes.func.isRequired,
        cart: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
    }

    componentDidMount = () => {
        this.props.fetchScheduleData()
            .then(() => {
                this.props.fetchCart();
            });
    }

    render() {
        return (
            <div id="cart-sidebar-container">
                <div id="cart-list-container">
                    {this.props.cart.items.map(item => {
                        return <ListItem key={ item } item={ this.props.events.items.get(item) } />
                    })}
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        cart: state.data.cart,
        events: state.data.events,
    }),
    dispatch => bindActionCreators({
        fetchCart,
        fetchScheduleData,
    }, dispatch)
)(Sidebar);
