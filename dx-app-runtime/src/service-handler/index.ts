import { Request, Response, NextFunction } from 'express';

export default async (
	implementation: any,
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	const { body } = request;
	const dxApp = request.app.locals.app;
	try {
		const result = await implementation(dxApp, body);
		response.send(result);
	} catch (error) {
		next(error);
	}
};
