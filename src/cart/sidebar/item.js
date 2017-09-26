import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
    }

    render() {
        const { item } = this.props;

        if (!item) {
            return null;
        }

        return (
            <div className="cart-sidebar-item">
                { item.name } -- { item.id }
            </div>
        );
    }
}