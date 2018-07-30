import cors = require('cors');
import express = require('express');
import { https } from 'firebase-functions';

import authentication from './authentication';
import configuration from './configuration.json';
import graphqlServer from './graphql';
import persistentCache from './persistent-cache';

const app = express();

app.use(cors());
app.use(authentication);
app.use(persistentCache);

app.options('*', cors());
graphqlServer.applyMiddleware({ app });

export const functions = https.onRequest(app);
