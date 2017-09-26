import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

export default class extends Component {

    static propTypes = {
        // handleSubmit: PropTypes.func.isRequired,
    }

    render() {
        return (
            <div id="registration-form">
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        password_confirm: '',
                        phone: '',
                    }}
                    onSubmit={(values, { setSubmitting, setErrors }) => {
                        console.log('register - values', values)
                        setSubmitting(false);
                    }}
                    render={({ values, errors, touched, handleChange, handleSubmit, isSubmitting}) => (
                        <form onSubmit={ handleSubmit }>
                            Name:
                            <input
                                type="text"
                                name="name"
                                onChange={ handleChange }
                                value={ values.name }
                            />
                            <br />
                            Email:
                            <input
                                type="email"
                                name="email"
                                onChange={ handleChange }
                                value={ values.email }
                            />
                            <br />
                            Password:
                            <input
                                type="password"
                                name="password"
                                onChange={ handleChange }
                                value={ values.password }
                            />
                            <br />
                            Confirm Password:
                            <input
                                type="password"
                                name="password_confirm"
                                value={ values.name }
                                onChange={ handleChange }
                                value={ values.password_confirm }
                            />
                            <br />
                            Phone:
                            <input
                                type="text"
                                name="phone"
                                onChange={ handleChange }
                                value={ values.phone }
                            />
                            <br />
                            <button type="submit" disabled={ isSubmitting }>Register</button>
                        </form>
                    )}
                />
            </div>
        );
    }
}