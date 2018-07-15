import { parse } from 'url';

import { fetchGitHubTrends } from '../github-trends';

test('Fetch GitHub repositories', async () => {
  const repositories = await fetchGitHubTrends();

  for (const { name, url } of repositories) {
    expect(name.length).toBeGreaterThan(0);

    const { hostname, protocol } = parse(url);

    expect(hostname).toBe('github.com');
    expect(protocol).toBe('https:');
  }
});
