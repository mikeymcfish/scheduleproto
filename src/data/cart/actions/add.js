import request from './../../../shared/request';
import { ADD_TO_CART } from './../../../shared/state/action-types';

function addToCartRequested() {
    return {
        type: ADD_TO_CART.REQUEST,
    };
}

function addToCartSuccess(items) {
    return {
        type: ADD_TO_CART.SUCCESS,
        payload: items,
    };
}

function addToCartFailed(error) {
    return {
        type: ADD_TO_CART.FAILURE,
        payload: error,
    };
}

export function addToCart(event) {
    return dispatch => {
        console.log(event);
        return Promise.resolve();
        // Member id is optional
        // '/api/v1/scheduler/add_to_cart?product_id=' + event.id +"&member_id=" +
        // _this.state.members[this.state.selectedMemberKey].id
        // dispatch(listCartRequested());
        // return request.get('/api/v1/scheduler/cart.json')
        //     .then(response => dispatch(listCartSuccess(response.data)))
        //     .catch(error => {
        //         console.log('error', error);
        //     });
    };
}