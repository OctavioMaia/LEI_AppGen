const C = require('./constants');

module.exports.typeOf = (data) => {
    let stringConstructor = "test".constructor;
    let arrayConstructor = [].constructor;
    let objectConstructor = {}.constructor;

    if (data === null) {
        return C.NULL;
    }
    else if (data === undefined) {
        return C.UNDEFINED;
    }
    else if (data.constructor === stringConstructor) {
        return C.STRING;
    }
    else if (data.constructor === arrayConstructor) {
        return C.ARRAY;
    }
    else if (data.constructor === objectConstructor) {
        return C.OBJECT;
    }
    else {
        return C.UNKNOWN;
    }
};