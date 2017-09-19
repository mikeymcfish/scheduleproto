import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AgeOptionList from './age/list';

export default class extends Component {

    static propTypes = {
        changeAge: PropTypes.func.isRequired,
        changeLocation: PropTypes.func.isRequired,
        cart: PropTypes.array.isRequired,
        members: PropTypes.array.isRequired,
        currentMember: PropTypes.object.isRequired,
        // TODO: Figure out what type this is
        currentLocation: PropTypes.any.isRequired,
    }

    state = {
        ageSelectorVisible: false,
    }

    changeAge = (value) => {
        this.props.changeAge(value);
        this.setState({ ageSelectorVisible: false });
    }

    changeLocation = (value) => {
        console.log('mrt', 'change location', value);
    }

    showAgeOptions = () => {
        this.setState({ ageSelectorVisible: !this.state.ageSelectorVisible });
    }

    render() {
        const isCartEmpty = this.props.cart.length === 0;

        return (
            <h1 className="heading">
                <div className="filtering-header">

                    {/* Age */}
                    <div className="change-age-btn" data-tip={ !isCartEmpty ? "You may only add items to the cart for one member at a time." : null }>
                        <div className="text-right">
                            <span className="def-no-hov">
                                Showing events for
                            </span>
                            &nbsp;
                            <span className="editable-heading editable-age-group" onClick={ this.showAgeOptions }>test</span>
                        </div>
                        <div className="text-right filtering-hover-text">
                            <div className={ this.props.currentMember ? "member-type" : "" }>
                                click to change
                            </div>
                        </div>
                        <AgeOptionList options={ this.props.members.items.map(member => member.firstName()) } changeAge={ this.changeAge } visible={ this.state.ageSelectorVisible } />
                    </div>

                    <div className="text-center"> in</div>

                    {/* Location */}
                    <div className="change-location-btn" data-tip={ !isCartEmpty ? "You may only add items to the cart for one location at a time." : "" }>
                        <div className="text-left">
                            <span className="editable-heading">{ this.props.currentLocation} </span>
                        </div>
                        <div className="text-center filtering-hover-text">
                            <div>click to change</div>
                        </div>
                        <div className="filter-selection-box filter-location">
                            <div className="filter-option set-location-btn" data-location="Brooklyn">
                                Brooklyn
                            </div>
                            <div className="filter-option set-location-btn" data-location="TriBeCa">
                                TriBeCa
                            </div>
                        </div>
                    </div>

                </div>
            </h1>
        );
    }
}