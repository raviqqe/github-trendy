import axios from 'axios';
import express = require('express');
import { Request, Response } from 'express';
import * as lodash from 'lodash';
import { parse } from 'url';

import graphqlServer from '..';
import { ILanguage, IRepository } from '../../domain';

jest.setTimeout(20000);

const languageIDs = [undefined, '', 'c', 'c#', 'c++', 'common-lisp'];

beforeAll(() => {
  const app = express();
  graphqlServer.applyMiddleware({ app });
  app.listen(8080);
});

function languageIDToName(id: string): string {
  return id
    .replace('-', ' ')
    .split(' ')
    .map(lodash.capitalize)
    .join(' ');
}

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
  for (const languageID of languageIDs) {
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

    expect(repositories.length).toBeGreaterThan(0);

    for (const repository of repositories) {
      testRepository(repository);

      if (languageID) {
        expect(repository.language.id).toBe(languageID);
        expect(repository.language.name).toBe(languageIDToName(languageID));
      }
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
    expect(language.name).toBe(languageIDToName(languageID));
  }
});

test('Query days', async () => {
  for (const languageID of languageIDs) {
    const {
      data: {
        data: { days }
      }
    } = await axios.post('http://localhost:8080/graphql', {
      query: `
        query Query($languageID: ID) {
          days(languageID: $languageID) {
            id
            date
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
        }
      `,
      variables: { languageID }
    });

    expect(days.length).toBeGreaterThan(0);

    for (const { date, id, repositories } of days) {
      expect(typeof id).toBe('string');
      expect(typeof date).toBe('number');

      for (const repository of repositories) {
        testRepository(repository);
      }
    }
  }
});
