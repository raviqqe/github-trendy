import axios from 'axios';
import express = require('express');
import { Request, Response } from 'express';

import persistentCache from '../persistent-cache';

jest.setTimeout(10000);

const testData = { foo: 42 };

beforeAll(() => {
  const app = express();

  app.use(persistentCache);
  app.get('/', (_: Request, response: Response) => response.send(testData));

  app.listen(8081);
});

test('Respond to a request', async () => {
  const request = () => axios.get('http://localhost:8081');

  expect((await request()).data).toEqual(testData);
});
