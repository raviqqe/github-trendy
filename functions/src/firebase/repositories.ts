import { CollectionReference } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';

import { IRepository } from '../github';

export default class {
  private collection: CollectionReference;

  constructor(collection: CollectionReference) {
    this.collection = collection;
  }

  public async store(repositories: IRepository[]): Promise<void> {
    await Promise.all(
      repositories.map(
        async (repository: IRepository) =>
          await this.collection
            .doc(Buffer.from(repository.url).toString('base64'))
            .set(repository)
      )
    );
  }

  public async fetch(): Promise<IRepository[]> {
    return (await this.collection.get()).docs.map(
      snapshot => snapshot.data() as IRepository
    );
  }
}