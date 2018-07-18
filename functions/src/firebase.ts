import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';

admin.initializeApp();

export async function verifyToken(token: string): Promise<void> {
  await admin.auth().verifyIdToken(token);
}
