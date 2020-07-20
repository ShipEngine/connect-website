import { Request, Response } from "express";

export default async (implementation: any, request: Request, response: Response) => {
  const { body } = request;
  const dxApp = request.app.locals.app;
  const result = await implementation(dxApp, body);
  response.send(result);
};
