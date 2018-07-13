import { https } from 'firebase-functions';

import graphQL from './graphql';

export const graphql = https.onRequest(graphQL);
