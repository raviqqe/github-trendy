import { graphqlExpress } from 'apollo-server-express';
import axios from 'axios';
import * as bodyParser from 'body-parser';
import express = require('express');
import { Request, Response } from 'express';
import * as lodash from 'lodash';
import { parse } from 'url';

import { ILanguage, IRepository } from '../github';
import schema from '../schema';

jest.setTimeout(10000);

const app = express();

beforeAll(() => {
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.listen(8080);
});

function testLanguage({ id, color, name }: ILanguage) {
  expect(typeof color).toBe('string');
  expect(typeof id).toBe('string');
  expect(typeof name).toBe('string');
}

function testRepository({
  id,
  date,
  description,
  language,
  name,
  stars,
  url
}: IRepository & { id: string }) {
  expect(typeof id).toBe('string');
  expect(typeof date).toBe('number');

  if (description) {
    expect(typeof description).toBe('string');
  }

  if (language) {
    testLanguage(language);
  }

  expect(typeof name).toBe('string');
  expect(typeof stars).toBe('number');
  expect(stars).toBeGreaterThan(0);
  expect(typeof url).toBe('string');
  expect(parse(url).protocol).toBe('https:');
}

const defaultQuery = `
  query {
    repositories {
      id
      date
      language {
        color
        id
        name
      }
      name
      stars
      url
    }
  }
`;

test('Respond to requests', async () => {
  for (const request of [
    () =>
      axios.get('http://localhost:8080/graphql', {
        params: {
          query: defaultQuery
        }
      }),
    () =>
      axios.post('http://localhost:8080/graphql', {
        query: defaultQuery
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

test('Use language ID argument', async () => {
  for (const languageID of ['c', 'c#', 'c++']) {
    const {
      data: {
        data: { repositories }
      }
    } = await axios.post('http://localhost:8080/graphql', {
      query: `
        query Query($languageID: ID) {
          repositories(languageID: $languageID) {
            id
            date
            language {
              color
              id
              name
            }
            name
            stars
            url
          }
        }
      `,
      variables: { languageID }
    });

    for (const repository of repositories) {
      testRepository(repository);

      expect(repository.language.id).toBe(languageID);
      expect(repository.language.name).toBe(languageID.toUpperCase());
    }
  }
});

test('Query languages', async () => {
  const languageIDs = ['c', 'c#', 'c++'];

  const {
    data: {
      data: { languages }
    }
  } = await axios.post('http://localhost:8080/graphql', {
    query: `
        query Query($languageIDs: [ID]!) {
          languages(languageIDs: $languageIDs) {
            id
            color
            name
          }
        }
      `,
    variables: { languageIDs }
  });

  for (const [language, languageID] of lodash.zip(
    languages as ILanguage[],
    languageIDs
  )) {
    testLanguage(language);

    expect(language.id).toBe(languageID);
    expect(language.name).toBe(languageID.toUpperCase());
  }
});
