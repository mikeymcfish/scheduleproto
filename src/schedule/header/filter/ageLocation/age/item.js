import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class extends Component {
    static propTypes = {
        changeAge: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
    }

    changeAge = () => {
        this.props.changeAge(this.props.value);
    }

    render() {
        const { value } = this.props;

        return <div className="filter-option set-age-btn" onClick={ this.changeAge } data-age-group={ value }>{ value }</div>;
    }
}