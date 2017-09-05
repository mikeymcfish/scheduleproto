# Action Type Standards

## Static Action Types
Static Action Types are any that result in changes only in our **internal** redux store.
### Creation:
```
export const STATIC_ACTION = 'STATIC_ACTION';
```

### Consumption:
```
import { UPDATE_MEMBER } from 'shared/state/action-types';

export function updateMember(member) {
  return {
    type: UPDATE_MEMBER,
    item: member,
  };
}
```

## Async Action Types
Async action types are **any** action that results in a fetch request to an outside entity

### Creation:
```
export const ASYNC_ACTION = createAsyncTypes('ASYNC_ACTION');
```

This will result in the following structure
```
ASYNC_ACTION = {
	REQUEST: 'ASYNC_ACTION_REQUEST',
	SUCCESS: 'ASYNC_ACTION_SUCCESS',
	FAILURE: 'ASYNC_ACTION_FAILURE',
};
```

### Consumption:
```
import { RECEIVE_MEMBERS } from 'shared/state/action-types';

export function requestMembers(params = {}) {
  return {
    type: RECEIVE_MEMBERS.REQUEST,
    params,
  };
}
export function receiveMemberFailed(err) {
  return {
    type: RECEIVE_MEMBERS.FAILURE,
    payload: err,
  };
}

export function receiveMembers(payload = [], err = null) {
  return {
    type: RECEIVE_MEMBERS.SUCCESS,
    items: payload,
    error: err,
    receivedAt: Date.now(),
  };
}

export function fetchMembers() {
  return (dispatch) => {
    dispatch(requestMembers());
    return request().get('/members')
      .then(data => {
        dispatch(updateMember(data.member));
        dispatch(receiveMembers(data.members));
      })
      .catch(err => dispatch(receiveMembersFailed(err)));
  };
}
```
