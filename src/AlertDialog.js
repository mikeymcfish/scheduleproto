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
                <Dialog data-id={this.props.id} id="alert" open={this.props.open} onRequestClose={this.handleRequestClose} onClose={this.handleRequestClose}>
                    <DialogTitle>
                        {this.props.title} {this.props.spotsLeft ? <span className="small-text">({this.props.spotsLeft} spots left)</span> : ""}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {
                            this.props.button1 != null ?
                                <Button onClick={this.handleRequestClose} color="primary">
                                    {this.props.button1}
                                </Button>
                                :
                                ""
                        }

                        <Button raised
                         onClick={this.handleRequestClose} color="primary">
                            {this.props.button2}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}