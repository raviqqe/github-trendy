import cors = require('cors');
import express = require('express');

import { httpsFunction } from './firebase';
import graphqlServer from './graphql';

const app = express();

app.use(cors());
app.options('*', cors());
graphqlServer.applyMiddleware({ app });

export const functions = httpsFunction(app);
