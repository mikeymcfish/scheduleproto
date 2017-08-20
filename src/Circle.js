import React, {Component} from 'react';
import $ from 'jquery';

class Circle extends React.Component {
    constructor() {
        super()
        this.state = {
            display: "none"
        }
    }

    componentWillUpdate() {
        this.setState({
            display: this.props.displayCircle
                      });
    }

    render() {
        return (
            <svg className="circle" style={{display:"none"}}
                 version="1.0"
                 x="0px" y="0px" width="26.8px" height="27.6px" viewBox="0 0 26.8 27.6"
            >

                <g>
                    <path d="M19.2,0c0.9,0.1,1.7,0.7,2.3,1.2c0.6,0.6,1.2,1.2,1.7,1.9c1,1.4,1.8,2.9,2.4,4.6c1.2,3.2,1.6,6.9,0.6,10.3
		c-0.5,1.7-1.3,3.3-2.5,4.7c-0.6,0.7-1.2,1.3-1.9,1.9c-0.7,0.6-1.4,1.1-2.2,1.6c-1.6,0.9-3.5,1.3-5.3,1.3c-1.8,0-3.6-0.4-5.3-1.1
		c-3.4-1.4-6.4-3.9-7.9-7.4C-0.4,15.7-0.5,11.5,1.4,8c1-1.7,2.4-3.2,4.1-4.1c1.7-1,3.6-1.4,5.4-1.5c1.8-0.1,3.6,0.2,5.3,0.7
		c1.7,0.5,3.3,1.4,4.6,2.6l-0.2,0.2c-3-1.5-6.4-1.8-9.5-1.3C9.6,4.9,8.2,5.5,7,6.3C5.8,7.1,4.8,8.2,4.2,9.5
		c-1.3,2.5-1.5,5.7-0.5,8.6c1,2.8,3.4,5.2,6.3,6.5c2.8,1.3,6.2,1.6,9,0.3c2.8-1.5,5.1-4,6.1-7.1c1-3.1,0.8-6.5-0.2-9.7
		c-0.5-1.6-1.2-3.1-2.1-4.5c-0.5-0.7-1-1.4-1.6-1.9c-0.6-0.6-1.3-1.1-2-1.2L19.2,0z"/>
                </g>
            </svg>
        );
    }
}

export default Circle;
