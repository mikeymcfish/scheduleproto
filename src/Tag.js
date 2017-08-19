import React, {Component} from 'react';
import './App.css';

class Tag extends React.Component {

    render() {
        return (
            <div className={"tag tag-"+this.props.tagType}>
                {this.props.text}
            </div>
        );

    }

}

export default Tag;
