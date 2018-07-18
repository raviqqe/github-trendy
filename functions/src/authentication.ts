import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';

admin.initializeApp();

export default async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  await admin.auth().verifyIdToken(request.get('Authorization').split(' ')[1]);
  await next();
};
