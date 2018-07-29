import * as lodash from 'lodash';

export function initializeApp() {
  return;
}

class Firestore {
  private data = {};

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
          get: async () => ({ data: () => lodash.get(this.data, newPaths) }),
          set: data => lodash.set(this.data, newPaths, data)
        };
      },
      get: async () => ({
        docs: Object.values(lodash.get(this.data, paths) || {}).map(data => ({
          data: () => data
        }))
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

export function storage() {
  return {
    bucket() {
      return {
        file: (name: string) => {
          return {
            download: async () => [this[name]],
            exists: async () => [this[name] !== undefined],
            save: async data => (this[name] = Buffer.from(data))
          };
        }
      };
    },
    'empty-file': ''
  };
}
