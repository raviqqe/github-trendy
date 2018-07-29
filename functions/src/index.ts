import { graphqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import cors = require('cors');
import express = require('express');
import { https } from 'firebase-functions';

import authentication from './authentication';
import configuration from './configuration.json';
import persistentCache from './persistent-cache';
import schema from './schema';

const app = express();

app.use(cors());
app.use(authentication);
app.use(persistentCache);

app.options('*', cors());
app.get(
  '/graphql',
  graphqlExpress({
    cacheControl: {
      defaultMaxAge: configuration.cacheExpirationTime
    },
    schema,
    tracing: true
  })
);

export const functions = https.onRequest(app);
