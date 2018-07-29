import Storage from '../storage';

const name = 'https://foo.com/bar?a=b';
const data = { foo: 123, bar: 456 };

test('Store a file', async () => {
  const storage = new Storage();

  await storage.set(name, { foo: 123, bar: 456 });

  expect(await storage.get(name)).toEqual(data);
});

test('Fetch an empty file', async () => {
  expect(await new Storage().get('empty-file')).toBe(null);
});
