import { Record } from 'immutable';

class Auth extends Record ({
    user_id: null,
    access_token: null,
}) {
    // Nothing!
}

export default Auth;