import {
  BadRequestError,
  NotImplementedError,
  UnauthorizedError,
} from '@shipengine/connect-runtime';
import { Request } from 'express';
import { isRequestAuth, RequestAuth } from '../models';
import { InventoryHandler, RequestWithAuth } from './types';

export const extractCursor = (request: Request): string | undefined =>
  request.params.cursor;

/**
 * Extracts `Authorization` header from an incoming request, decodes and
 * parses it to a `RequestAuth` object. Throws Auth / BadRequest errors if
 * decoding / parsing fails.
 */
export const extractAuth = (request: RequestWithAuth): RequestAuth => {
  const rawAuth = request.get('Authorization');
  if (!rawAuth) {
    throw new UnauthorizedError('Auth header missing', {
      message: 'Must provide base64 value under `Authorization` header',
    });
  }

  const decoded = Buffer.from(rawAuth, 'base64').toString();

  try {
    const parsed = JSON.parse(decoded);
    if (isRequestAuth(parsed)) {
      return parsed;
    } else {
      throw new BadRequestError('Malformed auth header', {
        message:
          'Auth header must match `RequestAuth` shape – values must be booleans, numbers, or strings',
      });
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new BadRequestError('Malformed auth header', {
        message: 'Auth header must decode to a valid JSON object',
      });
    } else {
      throw error;
    }
  }
};

/**
 * Simple middleware to wrap individual handlers. Extracts and decodes
 * Authorization header, passing the result along with the request.body
 * to the given handler.
 *
 * NOTE: It may turn out we need to have a bit of data handling, e.g.
 * coercing strings to dates or vice versa; will circle back to this.
 */
export const handleRequest =
  (handler: InventoryHandler | undefined): any =>
  (request: Request) => {
    if (!handler) {
      throw new NotImplementedError();
    }

    const auth = extractAuth(request);
    const cursor = extractCursor(request);
    return handler({ auth, cursor, ...request.body });
  };
