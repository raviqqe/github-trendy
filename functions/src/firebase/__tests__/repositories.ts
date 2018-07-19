import * as admin from 'firebase-admin';

import { IRepository } from '../../github';
import Repositories from '../repositories';

const testRepository: IRepository = {
  date: new Date().getTime(),
  description: 'This is good.',
  id: 'javascript/raviqqe/github-new-trends',
  language: 'C',
  name: 'raviqqe / github-new-trends',
  stars: 42,
  url: 'https://github.com/raviqqe/github-new-trends'
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
