import { Record } from 'immutable';

const commonValues = {}

const BaseModel = defaultValues => class extends Record({ ...commonValues, ...defaultValues }) {
    // Nothing yet!
}

export default BaseModel;