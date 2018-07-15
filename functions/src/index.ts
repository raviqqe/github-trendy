import { https } from 'firebase-functions';

import app from './app';

export const functions = https.onRequest(app);
