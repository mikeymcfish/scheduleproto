import BaseModel from './../BaseModel';

class Member extends BaseModel ({
    id: null,
    name: null,
    type: null,
    birthday: null, // Should be RFC 3339 / ISO 8601
    school: null, // Should be an ID
    defaultLocation: null,
}) {
    // Nothing!
};

Member.TYPE = {
    Classic: "classic",
};

export default Member;