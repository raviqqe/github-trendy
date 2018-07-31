import cors = require('cors');
import express = require('express');

import { httpsFunction } from './firebase';
import graphqlServer from './graphql';
import nuxt from './nuxt';

const graphqlApp = express();

graphqlApp.use(cors());
graphqlApp.options('*', cors());
graphqlServer.applyMiddleware({ app: graphqlApp, path: '/' });

export const graphql = httpsFunction(graphqlApp);

const nuxtApp = express();

nuxtApp.use(cors());
nuxtApp.options('*', cors());
nuxtApp.use(nuxt.render);

export const ssr = httpsFunction(nuxtApp);
