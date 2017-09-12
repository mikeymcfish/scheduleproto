import React, { Component } from 'react';

import ListItem from './item';

import moment from 'moment';
import uniqBy from 'lodash/uniqBy';
import flattenDeep from 'lodash/flattenDeep';
import orderBy from 'lodash/orderBy';

import './../../styles/list.css';

const MAX_LIST_EVENTS = 50;

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
        var listEvents = [];
        var notFound = true;
        while (notFound) {
            var dateString = today.format('M-D');

            if (dayStringOrdered[dateString]) {
                var events = dayStringOrdered[dateString].map(event => {
                    event.dateObject = today.clone();
                    return Object.assign({}, event);
                });

                listEvents.push(events);
            }

            // Stops this from being an infinite loop
            if (today.isAfter(moment().add(60, 'days')) || listEvents.length > MAX_LIST_EVENTS) {
                return flattenDeep(listEvents);
            }

            today = today.clone().add(1, 'days');
        }
    }

    orderEvents(events) {
        return orderBy(events, event => event.dateObject.format('YYYYDDDD'));
    }

    render() {
        const events = this.orderEvents(this.getEvents(this.props.allEvents));

        if (!events || events.length === 0 || this.props.hide) {
            return null;
        }

        return <div id="list-container">
            {events.map(event => {
                return <ListItem event={ event } setViewDay={ this.props.setViewDay } />;
            })}
        </div>;
    }
}