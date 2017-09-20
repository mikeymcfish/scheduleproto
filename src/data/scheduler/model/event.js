import BaseModel from './../../BaseModel';

import { Map } from 'immutable';

class Event extends BaseModel({
    id: null,
    age: null,
    days: new Map,
    description: null,
    image: null,
    location: null,
    name: null,
    price: null,
    priority: null,
    spotsLeft: null,
    startTime: null,
    // Mapped from sub-title to subtitle
    subtitle: null,
    tags: [],
    type: null,
}) {
    // Model methods go here!
};

export default Event;