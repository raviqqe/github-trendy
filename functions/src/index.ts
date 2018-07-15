import { https } from 'firebase-functions';

import app from './app';

export const graphql = https.onRequest(app);
