import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import Languages from './languages';

admin.initializeApp(functions.config().firebase);

export async function verifyToken(token: string): Promise<void> {
  await admin.auth().verifyIdToken(token);
}

export const languages = new Languages();
