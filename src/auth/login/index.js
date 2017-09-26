import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import Yup from 'yup';

import { login } from './../../shared/auth/actions';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required('Required'),
    password: Yup.string().required('Required'),
})

class LoginForm extends Component {

    static propTypes = {
        login: PropTypes.func.isRequired,
    }

    render() {
        return (
            <div id="login-form">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={ validationSchema }
                    onSubmit={(values, { setSubmitting, setErrors }) => {
                        this.props.login(values.email, values.password)
                            .then(() => {
                                console.log('success');
                                setSubmitting(false);
                            })
                            .catch(() => {
                                console.log('failure');
                                setSubmitting(false);
                            });
                    }}
                    render={({ values, errors, touched, handleChange, handleSubmit, isSubmitting}) => (
                        <form onSubmit={ handleSubmit }>
                            Email:
                            <input
                                type="text"
                                name="email"
                                onChange={ handleChange }
                                value={ values.email }
                            />
                            { touched.email && errors.email && <div>{errors.email}</div> }
                            <br />
                            Password:
                            <input
                                type="password"
                                name="password"
                                onChange={ handleChange }
                                value={ values.password }
                            />
                            { touched.password && errors.password && <div>{errors.password}</div> }
                            <br />
                            <button type="submit" disabled={ isSubmitting }>Login</button>
                            <br />
                            <a href="#">Forgot your password?</a>
                        </form>
                    )}
                />
            </div>
        );
    }
}

export default connect(
    null,
    dispatch => bindActionCreators({
        login,
    }, dispatch)
)(LoginForm);