import { graphqlExpress } from 'apollo-server-express';
import axios from 'axios';
import * as bodyParser from 'body-parser';
import express = require('express');
import { Request, Response } from 'express';
import * as httpMocks from 'node-mocks-http';
import { parse } from 'url';

import schema from '../schema';

const app = express();

beforeAll(() => {
  app.post('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.listen(8080);
});

test('app function', () => {
  const request = httpMocks.createRequest({
    body: { query: 'repositories {}' },
    method: 'POST'
  });

  request.resume = () => undefined;

  app(request, httpMocks.createResponse());
});

test('Server response', async () => {
  const {
    data: {
      data: { repositories }
    }
  } = await axios.post('http://localhost:8080/graphql', {
    query: 'query { repositories { id, language, name, stars, url } }'
  });

  for (const { id, language, name, stars, url } of repositories) {
    expect(typeof id).toBe('string');
    expect(typeof language).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof stars).toBe('number');
    expect(stars).toBeGreaterThan(0);
    expect(typeof url).toBe('string');
    expect(parse(url).protocol).toBe('https:');
  }
});

test('Use language argument', async () => {
  const {
    data: {
      data: { repositories }
    }
  } = await axios.post('http://localhost:8080/graphql', {
    query: `
      query Query($language: String) {
        repositories(language: $language) {
          id
          language
          name
          stars
          url
        }
      }
    `,
    variables: { language: 'c' }
  });

  for (const { id, language, name, stars, url } of repositories) {
    expect(typeof id).toBe('string');
    expect(language).toBe('C');
    expect(typeof name).toBe('string');
    expect(typeof stars).toBe('number');
    expect(stars).toBeGreaterThan(0);
    expect(typeof url).toBe('string');
    expect(parse(url).protocol).toBe('https:');
  }
});
