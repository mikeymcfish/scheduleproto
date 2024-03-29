import React, {Component} from 'react';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet(theme => ({
    button: {
        margin: theme.spacing.unit,
    },
}));

function LinkBar(props) {
    const classes = props.classes;
    return (
        <div className="link-bar">
            <div>
                <Button raised color="secondary" href="#" className={classes.button}>
                    Sign up for membership
                </Button>
                <Button raised color="primary" href="#" className={classes.button}>
                    Members Log-in
                </Button>

            </div>

            {/*<Button className={classes.button}>Default</Button>*/}
            {/*<Button color="primary" className={classes.button}>*/}
                {/*Primary*/}
            {/*</Button>*/}
            {/*<Button color="accent" className={classes.button}>*/}
                {/*Accent*/}
            {/*</Button>*/}
            {/*<Button color="contrast" className={classes.button}>*/}
                {/*Contrast*/}
            {/*</Button>*/}
            {/*<Button disabled className={classes.button}>*/}
                {/*Disabled*/}
            {/*</Button>*/}
            {/*<Button href="#flat-buttons" className={classes.button}>*/}
                {/*Link*/}
            {/*</Button>*/}
            {/*<Button dense className={classes.button}>*/}
                {/*Dense*/}
            {/*</Button>*/}
        </div>
    );
}

// class LinkBar extends React.Component {
//     constructor() {
//         super()
//     }
//
//     render() {
//         return (
//             <div className="link-bar">
//                 <Button dense className={classes.button}>
//                     Dense
//                 </Button>
//                 <div>Parents of members, log in to see your discount pricing or sign up for membership here</div>
//             </div>
//
//
//         );
//     }
// }

LinkBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(LinkBar);
