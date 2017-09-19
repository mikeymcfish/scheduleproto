import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AgeItem from './item';

import classNames from 'classnames';

export default class extends Component {

    defaultOptions = [
        "age 7 to 9",
        "age 9 to 11",
        "age 12 to 14",
    ];

    static propTypes = {
        changeAge: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        visible: PropTypes.bool.isRequired,
    }

    render() {
        let { options, visible } = this.props;

        if (options.length === 0) {
            options = this.defaultOptions;
        }

        const cssClasses = classNames('filter-selection-box', 'filter-age', {
            'show-flex': visible,
        })

        return (
            <div className={ cssClasses }>
                {options.map(value => <AgeItem value={ value } changeAge={ this.props.changeAge } />)}
            </div>
        );
    }
}