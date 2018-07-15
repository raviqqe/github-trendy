import axios from 'axios';
import { Request, Response } from 'express';
import * as httpMocks from 'node-mocks-http';
import { parse } from 'url';

import app from '../app';

test('app function', () => {
  const request = httpMocks.createRequest({
    body: { query: 'repositories {}' },
    method: 'POST'
  });

  request.resume = () => undefined;

  app(request, httpMocks.createResponse());
});

test('Server response', async () => {
  app.listen(8888);

  const {
    data: {
      data: { repositories }
    }
  } = await axios.post('http://localhost:8888/graphql', {
    query: 'query { repositories { id, name, url } }'
  });

  for (const { id, name, url } of repositories) {
    expect(typeof id).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof url).toBe('string');
    expect(parse(url).protocol).toBe('https:');
  }
});
