import request from './../request';
import { AUTH } from './../state/action-types';

function authRequested() {
    return {
        type: AUTH.REQUEST,
    };
}

function authSuccess(auth) {
    return {
        type: AUTH.SUCCESS,
        payload: auth,
    };
}

function authFailed(error) {
    return {
        type: AUTH.FAILURE,
        payload: error,
    };
}

export function fetchAuth() {
    return dispatch => {
        dispatch(authRequested());
        return request.get('/api/v1/scheduler/auth.json')
            .then(response => dispatch(authSuccess(response.data)))
            .catch(error => {
                console.log(error)
            });
    }
}

export function login(email, password) {
    return dispatch => {
        console.log('login', email, password);
        return Promise.resolve();
    }
}