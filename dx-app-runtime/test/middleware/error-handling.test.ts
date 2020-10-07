import { ErrorCode } from '../../src/errors';
import { getStandardizedErrorCode, StandardizedErrorCode, getStatusCode } from '../../src/middleware/error-handling';

const expectedErrorCodeMapping: any[][] = [
    [undefined, undefined, StandardizedErrorCode.Generic],
    [ErrorCode.AppError, undefined, StandardizedErrorCode.Generic],
    [ErrorCode.NotSupported, undefined, StandardizedErrorCode.Generic],
    [ErrorCode.RateLimit, undefined, StandardizedErrorCode.Generic],
    [ErrorCode.UnAuthorized, undefined, StandardizedErrorCode.UnAuthorized],
    [ErrorCode.External, 500, StandardizedErrorCode.ExternalServerError],
    [ErrorCode.External, 400, StandardizedErrorCode.ExternalClientError],
    [ErrorCode.Invalid, 400, StandardizedErrorCode.Validation],
]

const expectedStatusCodeMapping: any[][] = [
    [undefined, undefined, 500],
    [ErrorCode.AppError, undefined, 400],
    [ErrorCode.NotSupported, undefined, 404],
    [ErrorCode.RateLimit, undefined, 429],
    [ErrorCode.UnAuthorized, undefined, 401],
    [ErrorCode.External, 500, 520],
    [ErrorCode.External, 400, 400],
    [ErrorCode.Invalid, 400, 400],
]

describe('Error Handler', () => {
    describe('Map Standardized Error Codes', () => {
        test.each(expectedErrorCodeMapping)('getStandardizedErrorCode(%s, %s) maps to %s', (code, statusCode, expected) => {
            expect(getStandardizedErrorCode(code, statusCode)).toEqual(expected);
        });
    });

    describe('Map Status Codes', () => {
        test.each(expectedStatusCodeMapping)('getStatusCode(%s, %s) maps to %s', (code, statusCode, expected) => {
            expect(getStatusCode(code, statusCode)).toEqual(expected);
        });
    });
    
})