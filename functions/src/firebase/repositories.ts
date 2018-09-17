import { CollectionReference } from "@google-cloud/firestore";
import * as admin from "firebase-admin";

import { IRepository } from "../domain";

export default class {
  private collection: CollectionReference;

  constructor(collection: CollectionReference) {
    this.collection = collection;
  }

  public async store(repositories: IRepository[]): Promise<void> {
    await Promise.all(
      repositories.map(async (repository: IRepository) => {
        const key = Buffer.from(repository.url).toString("base64");

        const oldRepository = (await this.collection
          .doc(key)
          .get()).data() as IRepository;

        await this.collection
          .doc(key)
          .set(
            oldRepository
              ? { ...repository, date: oldRepository.date }
              : repository
          );
      })
    );
  }

  public async fetch(): Promise<IRepository[]> {
    return (await this.collection
      .orderBy("date", "desc")
      .orderBy("stars", "desc")
      .limit(1000)
      .get()).docs.map(snapshot => snapshot.data() as IRepository);
  }
}
