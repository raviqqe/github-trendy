import { NextFunction, Request, Response } from 'express';

import * as firebase from './firebase';

export default async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  await firebase.verifyToken(request.get('Authorization').split(' ')[1]);
  await next();
};
