import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

export default class AlertDialog extends Component {
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
                <Dialog id="alert" open={this.props.open} onRequestClose={this.handleRequestClose} onClose={this.handleRequestClose}>
                    <DialogTitle>
                        {this.props.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Proceed
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}