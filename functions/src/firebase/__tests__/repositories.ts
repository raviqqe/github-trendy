import * as admin from 'firebase-admin';

import { IRepository } from '../../github';
import Repositories from '../repositories';

const testRepository: IRepository = {
  date: new Date().getTime(),
  language: 'C',
  name: 'raviqqe / github-new-trends',
  stars: 42,
  url: 'https://github.com/raviqqe/github-new-trends'
};

test('Store repositories', () => {
  const repositories = new Repositories(
    admin.firestore().collection('repositories')
  );

  repositories.store([testRepository]);
});

test('Fetch repositories', async () => {
  const repositories = new Repositories(
    admin.firestore().collection('repositories')
  );

  expect(await repositories.fetch()).toEqual([]);

  repositories.store([testRepository]);

  expect(await repositories.fetch()).toEqual([testRepository]);
});
