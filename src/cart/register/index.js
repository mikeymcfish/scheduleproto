import React, { Component } from 'react';

import LoginForm from './../../auth/login';
import RegistrationForm from './../../auth/register';
import Cart from './../sidebar';

export default class extends Component {
    render() {
        return (
            <div id="cart-register">
                {/* Register */}
                <div className="col-md-6">
                    <div className="panel panel-default ticket-panel border-light">
                        <div className="panel-heading">Create an account with The Pixel Academy</div>
                        <div className="panel-body">
                            <RegistrationForm />
                        </div>
                    </div>
                </div>

                {/* Login */}
                <div className="col-md-6">
                    <div className="panel panel-default ticket-panel border-light">
                        <div className="panel-heading">Log in with an existing account</div>
                        <div className="panel-body">
                            <LoginForm />
                        </div>
                    </div>
                </div>

                {/* Cart */}
                <div className="col-xs-11 col-md-3">
                    <div className="panel panel-danger cart border-light">
                        <div className="panel-heading">Shopping Cart</div>
                        <div className="panel-body">
                            <Cart />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
