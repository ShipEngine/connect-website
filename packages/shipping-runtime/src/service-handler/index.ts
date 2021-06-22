import { Request, Response, NextFunction } from 'express';
import { HeaderArgs } from '../mapping/functions';

export default async (
  implementation: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { body } = request;
  const dxApp = request.app.locals.app;
  try {
    const headers: HeaderArgs = {
      language: request.headers['accept-language'] || 'en',
    };
    const result = await implementation(dxApp, body, headers);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
