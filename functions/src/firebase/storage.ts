import * as admin from 'firebase-admin';

import configuration from '../configuration.json';

export default class {
  private bucket = admin.storage().bucket();

  public async set(key: string, value: any): Promise<void> {
    await this.bucket.file(key).save(JSON.stringify(value));
  }

  public async get(key: string): Promise<any> {
    const file = this.bucket.file(key);

    if (!(await file.exists())[0]) {
      return null;
    }

    const data = (await file.download())[0].toString();

    if (!data) {
      return null;
    }

    const { updated }: any = (await file.getMetadata())[0];

    if (
      new Date(updated).getTime() + 1000 * configuration.cacheExpirationTime <
      new Date().getTime()
    ) {
      return null;
    }

    return JSON.parse(data);
  }
}
