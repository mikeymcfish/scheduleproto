import Member from './model.js';
import EntityState from './../EntityState';

export default (state = new EntityState(), action) => {
    switch (action.type) {
        default:
            console.log(action);
            return state;
    }
};