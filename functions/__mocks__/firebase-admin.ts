import * as lodash from 'lodash';

export function initializeApp() {
  return;
}

class Firestore {
  private storage = {};

  public collection(path: string, paths: string[] = []) {
    paths = [...paths, path];

    return {
      doc: (docPath: string) => {
        return {
          collection: (path: string) =>
            this.collection(path, [...paths, docPath]),
          set: data => lodash.set(this.storage, paths, data)
        };
      },
      get: () =>
        Promise.resolve({
          docs: lodash.get(this.storage, paths).map(data => ({
            data: () => data
          }))
        })
    };
  }
}

export function firestore() {
  return new Firestore();
}
