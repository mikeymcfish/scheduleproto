import React, { Component } from 'react';

import ListItem from './item';

import moment from 'moment';
import uniqBy from 'lodash/uniqBy';

import './../../styles/list.css';

export default class extends Component {
    getEvents(allEvents) {
        var today = moment();
        const dayStringOrdered = {};
        allEvents.forEach(event => {
            const daySplit = event.daystring.split(',');
            daySplit.forEach(daystring => {
                if (!dayStringOrdered[daystring]) {
                    dayStringOrdered[daystring] = [];
                }

                // This is ugly...
                dayStringOrdered[daystring].push(event);
                dayStringOrdered[daystring] = uniqBy(dayStringOrdered[daystring], 'id');
            });
        });

        if (Object.keys(dayStringOrdered).length == 0) {
            return null;
        }

        // This is pretty janky, need to find a better way
        var notFound = true;
        while (notFound) {
            var dateString = today.format('M-D');

            if (dayStringOrdered[dateString]) {
                return dayStringOrdered[dateString].map(event => {
                    event.dateObject = today;
                    return event;
                });
            }

            // Stops this from being an infinite loop
            if (today.isAfter(moment().add(60, 'days'))) {
                return null;
            }

            today.add(1, 'days');
        }
    }

    render() {
        const events = this.getEvents(this.props.allEvents);

        if (!events || this.props.hide) {
            return null;
        }

        return <div id="list-container">{events.map(event => <ListItem event={ event } />)}</div>;
    }
}