import React, { Component } from 'react';

export default class extends Component {

    openBigDay = (event) => {
        // console.log(event);
        this.props.setViewDay(event.dateObject.format('MMMM'), event.dateObject.format('D'));
    }

    render() {
        const { event } = this.props;

        return (
            <div key={ event.id } className="list-item" onClick={ this.openBigDay.bind(null, event) }>
                <div className={ "list-item-date-container " + event.type + "-color" }>
                    <div className="list-item-date">
                        <div className="list-item-date-name">{ event.dateObject.format('ddd') }</div>
                        <div className="list-item-date-number">{ event.dateObject.format('D') }</div>
                    </div>
                </div>
                <div className="list-item-body">
                    <div className="list-item-title">
                        <div className="list-item-title-name">{ event.name }</div>
                        <div className="list-item-title-age">{ event.age }</div>
                    </div>
                    <div className="list-item-dates">
                        <span className="list-item-dates-title">dates</span>
                        <span className="list-item-dates-dates">{ event.daystring.replace('-', '/').split(',').join(', ') }</span>
                    </div>
                </div>
            </div>
        );
    }
}