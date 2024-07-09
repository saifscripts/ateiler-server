"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    // Extract first key and value from err.keyValue
    const [[key, value]] = Object.entries(err.keyValue);
    const errorSources = [
        {
            path: key,
            message: `${value} already exists!`,
        },
    ];
    return {
        statusCode: 400,
        message: `${key} already exists!`,
        errorSources,
    };
};
exports.default = handleDuplicateError;
