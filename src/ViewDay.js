import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import Divider from 'material-ui/Divider';

export default class ViewDay extends Component {
    state = {
        open: false,
    };

    handleRequestClose = () => {
        this.setState({ open: false });
        this.props.onClose(this.state.open);
    };

    render() {
        return (
            <div>
                <Dialog data-id={this.props.id} id="viewDay" open={this.props.open} onRequestClose={this.handleRequestClose} onClose={this.handleRequestClose}>
                    <DialogTitle>
                        {/*{this.props.month} {this.props.day} at {this.props.location}*/}
                        Tuesday, September 15 at Brooklyn
                    </DialogTitle>
                    <DialogContent>
                        <div className="view-day-content">
                            <div className="time-of-day">Series:</div>
                            <div className="schedule-item">Virtual Reality Gaming (2 of 6)<div className="schedule-item-subtext">4:00 - 5:30 p.m.</div></div>
                            <div className="time-of-day">Pro series:</div>
                            <div className="schedule-item none">--none--
                            </div>
                            <div className=""></div>
                        </div>
                        <Divider light />
                        <div>Add-ons available for this day:</div>
                        <div className="button-section">
                            <div>
                                <Button raised color="primary" className="pro-series-btn">PRO: Build a Computer</Button>
                            </div>
                            <div>
                                <Button raised color="primary" className="pro-series-btn">PRO: Augmented Reality</Button>
                            </div>
                        </div>

                        {/*<DialogContentText>*/}
                            {/*{this.props.text}*/}
                        {/*</DialogContentText>*/}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            {this.props.button1}
                        </Button>
                        <Button onClick={this.handleRequestClose} color="primary">
                            {this.props.button2}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}