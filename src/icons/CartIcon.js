import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './CartIcon.css';


export default class CartIcon extends React.Component {
    render() {
        
        return (
            <div className="cart-icon">

                <svg version="1.0"
                         x="0px" y="0px" width="22px" height="22px" viewBox="0 0 24 24">
                    <defs>
                    </defs>
                    <g id="Outline_Icons_1_">
                        <g>
                            <polygon className="st0" points="20.5,22.5 3.5,22.5 1.5,11.5 22.5,11.5 		"/>
                            <rect x="0.5" y="9.5" className="st0" width="23" height="2"/>
                            <line className="st0" x1="3.5" y1="7.5" x2="9.5" y2="1.5"/>
                            <line className="st0" x1="20.5" y1="7.5" x2="14.5" y2="1.5"/>
                        </g>
                    </g>
                    {/*<g id="Invisible_Shape_1_">*/}
                        {/*<rect className="st1" width="24" height="24"/>*/}
                    {/*</g>*/}
                    </svg>
                <div className="cart-number"></div>
            </div>
        )

    }
}