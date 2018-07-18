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
        const newPaths = [...paths, path];

        return {
          collection: (path: string) => this.collection(path, newPaths),
          set: data => lodash.set(this.storage, newPaths, data)
        };
      },
      get: () =>
        Promise.resolve({
          docs: Object.values(lodash.get(this.storage, paths)).map(data => ({
            data: () => data
          }))
        })
    };
  }
}

export function firestore() {
  return new Firestore();
}
