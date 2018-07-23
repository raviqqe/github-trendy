import * as lodash from 'lodash';

export function initializeApp() {
  return;
}

class Firestore {
  private storage = {};

  public collection(path: string, paths: string[] = []) {
    paths = [...paths, path];

    return {
      doc: (path: string) => {
        if (!path) {
          throw new Error('falsy document path');
        }

        const newPaths = [...paths, path];

        return {
          collection: (path: string) => this.collection(path, newPaths),
          get: async () => ({ data: () => lodash.get(this.storage, newPaths) }),
          set: data => lodash.set(this.storage, newPaths, data)
        };
      },
      get: async () => ({
        docs: Object.values(lodash.get(this.storage, paths) || {}).map(
          data => ({
            data: () => data
          })
        )
      }),
      limit() {
        return this;
      },
      orderBy() {
        return this;
      }
    };
  }
}

export function firestore() {
  return new Firestore();
}
