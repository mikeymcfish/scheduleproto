## Redux Data Models

### Introduction

This area handles all the object models, ajax calls, actions, and reducers as
they relate to CRUD operations in the application. This means that `GET`,
`POST`, `PUT`, and `DELETE` methods on objects or list of objects should be
handled here. These actions (and reducers) should all be generally based.
Anything more specific should be handled in module actions and reducers.

### Structure

All the data objects are stored in the `data` key in the redux store.

```js
const store = {
  data: {
    member: {
      loaded: false,
      loading: true,
      items: []
    },
    foobar: {
      /* ... */
    },
    /* ... */
  }
};
```

### Actions

Actions allow you to execute CRUD commands from within your
components.

```js
import { fetchMembers } from 'data/member/actions';

// Make sure to bind the action creator to your Component

// Use:
this.props.fetchMembers();

// Use the "loading" key to determine render()
render() {
  if (!state.data.member.loaded) {
    return (<Loading />);
  }

  // Render list of positions here
}
```

### Selectors

Redux store data across modules should be accessed through selectors.
Selectors accept a state position and return a list of requested data.
As the backing data changes, the selectors will update the components
with the new data.

```js
import { getMembers } from 'data/member/selectors';

const members = getMembers(state);
```

### Using with react-redux

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Import actions to fetch data from the API
import { fetchMembers } from 'data/member/actions';
// Import position selectors to get the data from redux store
import { getMembers } from 'data/member/selectors';

export class MemberList extends Component {
  static propTypes = {
    members: PropTypes.object,
    fetchMembers: PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchMembers();
  }

  render() {
    return (
      <ul>
        {
          this.props.members.map((member) => {
            return (<li>{ member.name }</li>);
          })
        }
      </ul>
    );
  }
}

export default connect(
  (state) => ({
    members: getMembers(state),
  }),
  (dispatch) => bindActionCreators({
    fetchMembers,
  })
)(MemberList);
```
