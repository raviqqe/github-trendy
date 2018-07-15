import { parse } from 'url';

import { fetchTrendingRepositories } from '../github';

test('Fetch GitHub repositories', async () => {
  const repositories = await fetchTrendingRepositories();

  for (const { name, url } of repositories) {
    expect(name.length).toBeGreaterThan(0);

    const { hostname, protocol } = parse(url);

    expect(hostname).toBe('github.com');
    expect(protocol).toBe('https:');
  }
});
