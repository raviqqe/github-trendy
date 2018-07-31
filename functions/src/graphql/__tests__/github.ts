import { parse } from 'url';

import { fetchLanguage, fetchRepositories } from '../github';

jest.setTimeout(20000);

test("Fetch today's repositories", async () => {
  for (const languageID of [undefined, 'c', 'javascript']) {
    const repositories = await fetchRepositories(languageID);

    for (const { language, name, stars, url } of repositories) {
      if (language) {
        expect(typeof language).toBe('object');
      }

      expect(typeof name).toBe('string');
      expect(typeof stars).toBe('number');

      const { hostname, protocol } = parse(url);

      expect(hostname).toBe('github.com');
      expect(protocol).toBe('https:');
    }
  }
});

test('Fetch a language information', async () => {
  for (const languageID of ['c', 'javascript']) {
    const { color, id, name } = await fetchLanguage(languageID);

    expect(typeof color).toBe('string');
    expect(typeof id).toBe('string');
    expect(typeof name).toBe('string');
  }
});
