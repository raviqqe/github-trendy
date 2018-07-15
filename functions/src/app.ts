import { graphqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import cors = require('cors');
import express = require('express');

import schema from './schema';

const app = express();

app.use(cors({ origin: true }));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

export default app;
