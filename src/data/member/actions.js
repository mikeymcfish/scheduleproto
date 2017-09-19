import request from './../../shared/request';
import { LIST_MEMBERS } from './../../shared/state/action-types';

function listMembersRequested() {
    return {
        type: LIST_MEMBERS.REQUEST,
    };
}

function listMembersSuccess(members) {
    return {
        type: LIST_MEMBERS.SUCCESS,
        payload: members,
    };
}

function listMembersFailed(error) {
    return {
        type: LIST_MEMBERS.FAILURE,
        payload: error,
    };
}

export function fetchMembers() {
    return dispatch => {
        dispatch(listMembersRequested());

        // Remove .json
        return request.get('/api/v1/scheduler/members.json')
            .then(response => dispatch(listMembersSuccess(response.data.members)))
            .catch(error => {
                console.log('list-member-error', error);
            });
    }
}