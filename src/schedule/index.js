import React, { Component } from 'react';

import Filter from './filter';

export default class extends Component {
    render() {
        return (
            <div id="schedule-container">
                <Filter />
                Schedule
            </div>
        );
    }
}
