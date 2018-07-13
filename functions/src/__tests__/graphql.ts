import axios from 'axios';
import { Request, Response } from 'express';
import * as httpMocks from 'node-mocks-http';

import graphql from '../graphql';

test('graphql endpoint', () => {
  const request = httpMocks.createRequest({
    body: { query: 'repositories {}' },
    method: 'POST'
  });

  request.resume = () => undefined;

  graphql(request, httpMocks.createResponse());
});

test('server', async () => {
  graphql.listen(8888);

  const { data } = await axios.post('http://localhost:8888/graphql', {
    query: 'query { repositories { id } }'
  });

  expect(data).toEqual({ data: { repositories: [] } });
});
