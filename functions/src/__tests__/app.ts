import axios from 'axios';
import { Request, Response } from 'express';
import * as httpMocks from 'node-mocks-http';
import { parse } from 'url';

import app from '../app';

beforeAll(() => {
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
    query: 'query { repositories { id, name, url } }'
  });

  for (const { id, name, url } of repositories) {
    expect(typeof id).toBe('string');
    expect(typeof name).toBe('string');
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
          name
          url
        }
      }
    `,
    variables: { language: 'c' }
  });

  for (const { id, name, url } of repositories) {
    expect(typeof id).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof url).toBe('string');
    expect(parse(url).protocol).toBe('https:');
  }
});
