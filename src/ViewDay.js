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
                        <Divider light />
                        <div className="view-day-content">
                            <div className="time-of-day series-text">Series
                                <div className="schedule-item-subtext">4 - 5:30 p.m.</div>
                            </div>
                            <div className="schedule-item">Virtual Reality Gaming (2 of 6)</div>
                            <div className="time-of-day pro-text">Pro series
                                <div className="schedule-item-subtext">5:45 - 7 p.m.</div>
                            </div>
                            <div className="schedule-item ">
                                <Button raised color="secondary" className="pro-series-btn">Build a Computer</Button>
                                <Button raised color="secondary" className="pro-series-btn">Augmented Reality</Button>
                            </div>
                            <div className=""></div>
                        </div>
                        <Divider light />

                        {/*<DialogContentText>*/}
                            {/*{this.props.text}*/}
                        {/*</DialogContentText>*/}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            {this.props.button1}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}