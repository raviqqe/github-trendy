import { graphqlExpress } from 'apollo-server-express';
import axios from 'axios';
import * as bodyParser from 'body-parser';
import express = require('express');
import { Request, Response } from 'express';
import { parse } from 'url';

import { IRepository } from '../github';
import schema from '../schema';

jest.setTimeout(10000);

const app = express();

beforeAll(() => {
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.listen(8080);
});

function testRepository({
  id,
  date,
  language,
  name,
  stars,
  url
}: IRepository & { id: string }) {
  expect(typeof id).toBe('string');
  expect(typeof date).toBe('number');
  expect(typeof language).toBe('string');
  expect(typeof name).toBe('string');
  expect(typeof stars).toBe('number');
  expect(stars).toBeGreaterThan(0);
  expect(typeof url).toBe('string');
  expect(parse(url).protocol).toBe('https:');
}

test('Respond to requests', async () => {
  for (const request of [
    () =>
      axios.get('http://localhost:8080/graphql', {
        params: {
          query:
            'query { repositories { id, date, language, name, stars, url } }'
        }
      }),
    () =>
      axios.post('http://localhost:8080/graphql', {
        query: 'query { repositories { id, date, language, name, stars, url } }'
      })
  ]) {
    const {
      data: {
        data: { repositories }
      }
    } = await request();

    for (const repository of repositories) {
      testRepository(repository);
    }
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
          date
          language
          name
          stars
          url
        }
      }
    `,
    variables: { language: 'c' }
  });

  for (const repository of repositories) {
    testRepository(repository);

    expect(repository.language).toBe('C');
  }
});
