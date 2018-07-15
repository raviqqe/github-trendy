import { graphqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import express = require('express');

import schema from './schema';

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

export default app;
