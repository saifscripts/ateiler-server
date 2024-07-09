import {
    IDuplicateError,
    IErrorResponse,
    IErrorSources,
} from '../interfaces/errors';

const handleDuplicateError = (err: IDuplicateError): IErrorResponse => {
    // Extract first key and value from err.keyValue
    const [[key, value]] = Object.entries(err.keyValue);

    const errorSources: IErrorSources = [
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

export default handleDuplicateError;
