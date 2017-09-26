import request from './../../../shared/request';
import { LIST_CART } from './../../../shared/state/action-types';

function listCartRequested() {
    return {
        type: LIST_CART.REQUEST,
    };
}

function listCartSuccess(items) {
    return {
        type: LIST_CART.SUCCESS,
        payload: items,
    };
}

function listCartFailed(error) {
    return {
        type: LIST_CART.FAILURE,
        payload: error,
    };
}

export function fetchCart() {
    return dispatch => {
        dispatch(listCartRequested());
        return request.get('/api/v1/scheduler/cart.json')
            .then(response => dispatch(listCartSuccess(response.data)))
            .catch(error => {
                console.log('error', error);
            });
    };
}