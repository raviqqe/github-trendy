import * as admin from 'firebase-admin';

import { IRepository } from '../../domain';
import Repositories from '../repositories';

const testRepository: IRepository = {
  date: new Date().getTime(),
  description: 'This is good.',
  id: 'javascript/raviqqe/github-trendy',
  language: { color: 'black', id: 'c', name: 'C' },
  name: 'raviqqe / github-trendy',
  stars: 42,
  url: 'https://github.com/raviqqe/github-trendy'
};

test('Store repositories', async () => {
  const repositories = new Repositories(
    admin.firestore().collection('repositories')
  );

  await repositories.store([testRepository]);
});

test('Fetch repositories', async () => {
  const repositories = new Repositories(
    admin.firestore().collection('repositories')
  );

  expect(await repositories.fetch()).toEqual([]);

  await repositories.store([testRepository]);

  expect(await repositories.fetch()).toEqual([testRepository]);
});

test('Update repositories', async () => {
  const repositories = new Repositories(
    admin.firestore().collection('repositories')
  );

  await repositories.store([testRepository]);

  expect(await repositories.fetch()).toEqual([testRepository]);

  const newRepository = {
    ...testRepository,
    date: new Date().getTime(),
    name: 'someone / repo'
  };

  await repositories.store([newRepository]);

  expect(await repositories.fetch()).toEqual([
    { ...testRepository, name: 'someone / repo' }
  ]);
});
