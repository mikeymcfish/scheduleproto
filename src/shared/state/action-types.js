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

// Cart
export const ADD_TO_CART = createAsyncTypes('ADD_TO_CART');
export const LIST_CART = createAsyncTypes('LIST_CART');

// Members
export const LIST_MEMBERS = createAsyncTypes('LIST_MEMBERS');

// Schedule Closed Day
export const LIST_SCHEDULE_CLOSED_DAY = createAsyncTypes('LIST_SCHEDULE_CLOSED_DAY');
export const LIST_SCHEDULE_EVENT = createAsyncTypes('LIST_SCHEDULE_EVENT');
export const LIST_SCHEDULE_HOLIDAY = createAsyncTypes('LIST_SCHEDULE_HOLIDAY');
export const LIST_SCHEDULE_PICKUP_DAY = createAsyncTypes('LIST_SCHEDULE_PICKUP_DAY');