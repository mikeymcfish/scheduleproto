/**
 * @typedef {Object} ReduxRequest
 * @property {string} REQUEST Fetch call requested
 * @property {string} SUCCESS Fetch call successful
 * @property {string} FAILURE Fetch call failed
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

/**
 * DO NOT EDIT THIS FUNC
 * @param {string} base the request base name i.e. LOAD_ACCOUNTS
 * @return {ReduxRequest}
 */
export function createAsyncTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

// Auth
export const AUTH = createAsyncTypes('AUTH');

// Members
export const LIST_MEMBERS = createAsyncTypes('LIST_MEMBERS');