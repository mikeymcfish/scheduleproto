import React, { Component } from 'react';

export default class extends Component {
    render() {
        const filters = [
            {
                name: 'Series',
                func: () => {},
            },
            {
                name: 'Pro Series',
                func: () => {},
            },
            {
                name: 'Camp',
                func: () => {},
            },
            {
                name: 'Makerspace',
                func: () => {},
            },
            {
                name: 'Special Events',
                func: () => {},
            },
            {
                name: 'Pickups from P.S. 29',
                func: () => {},
            },
            {
                name: 'Parties',
                func: () => {},
            },
        ];

        return (
            <div className="filters">
                {filters.map(filter => {
                    return (
                        <div className="filter-circle-container">
                            <div className="filter-circle-filled series-color">icon</div>
                            <div className="filter-circle-label">{ filter.name }</div>
                        </div>
                    );
                })}
            </div>
        );
    };
}