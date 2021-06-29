import {
  BadRequestError,
  NotImplementedError,
  UnauthorizedError,
} from '@shipengine/connect-runtime';
import { RequestAuth } from '../models';
import { extractAuth, handleRequest } from './middleware';
import { RequestWithAuth } from './types';

describe('extractAuth', () => {
  const buildRequestWithAuth = (auth: any) => {
    let encoded: string;
    if (typeof auth === 'string') {
      encoded = Buffer.from(auth).toString('base64');
    } else {
      encoded = Buffer.from(JSON.stringify(auth)).toString('base64');
    }

    const request: RequestWithAuth = {
      get: () => encoded,
    };

    return request;
  };

  describe('when Auth header is well-formed', () => {
    it('returns decoded RequestAuth', () => {
      const validAuth: RequestAuth = {
        token: 'hey',
        id: 1234,
        someBoolean: true,
        someNull: null,
      };
      const goodRequest = buildRequestWithAuth(validAuth);

      const extracted = extractAuth(goodRequest);
      expect(extracted).toMatchObject({
        ...validAuth,
      });
    });
  });

  describe('when Auth header is malformed', () => {
    it('throws error if no Auth header provided', () => {
      const emptyRequest: RequestWithAuth = {
        get: () => undefined,
      };

      try {
        extractAuth(emptyRequest);
        fail("Should have failed on empty request, but didn't");
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedError);
        expect(error.message).toEqual('Auth header missing');
        expect(error.details).toBeDefined();
        expect(error.details[0].message).toEqual(
          'Must provide base64 value under `Authorization` header',
        );
      }
    });

    it('throws error if decoded Auth is not an object', () => {
      const notJson = 'someString';
      const badRequest = buildRequestWithAuth(notJson);

      try {
        extractAuth(badRequest);
        fail("Should have failed on non-JSON auth header, but didn't");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error.message).toEqual('Malformed auth header');
        expect(error.details).toBeDefined();
        expect(error.details[0].message).toEqual(
          'Auth header must decode to a valid JSON object',
        );
      }
    });

    it('throws error if decoded Auth does not match `RequestAuth` schema', () => {
      const complexAuth = {
        credentials: {
          token: {
            dev: 'foo',
          },
        },
      };

      const badRequest = buildRequestWithAuth(complexAuth);

      try {
        extractAuth(badRequest);
        fail("Should have failed on complex Auth header, but didn't");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
        expect(error.message).toEqual('Malformed auth header');
        expect(error.details).toBeDefined();
        expect(error.details[0].message).toEqual(
          'Auth header must match `RequestAuth` shape – values must be booleans, numbers, or strings',
        );
      }
    });
  });
});

describe('handleRequest', () => {
  describe('when no implementation is provided', () => {
    it('returns a function that throws a NotImplementedError', () => {
      const emptyHandler = undefined;
      const finalHandler = handleRequest(emptyHandler);

      try {
        finalHandler();
        fail("Handler should have thrown, but didn't");
      } catch (error) {
        expect(error).toBeInstanceOf(NotImplementedError);
      }
    });
  });
});
