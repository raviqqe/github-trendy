import axios from 'axios';
import cheerio = require('cheerio');
import * as url from 'url';

export interface IRepository {
  date: number;
  description?: string;
  id: string;
  language?: string;
  name: string;
  stars: number;
  url: string;
}

export async function fetchTrendingRepositories(
  language?: string
): Promise<IRepository[]> {
  if (!language) {
    language = '';
  }

  const $ = cheerio.load(
    (await axios.get(
      `https://github.com/trending/${encodeURIComponent(language)}`
    )).data
  );
  const repositories: IRepository[] = [];
  const date = new Date().getTime();

  for (const element of $('ol.repo-list li').toArray()) {
    const title = $(element).find('h3');
    const path = title.find('a').prop('href');

    repositories.push({
      date,
      description: $(element)
        .find('p')
        .text()
        .trim(),
      id: (language || 'all') + path,
      language: $(element)
        .find('[itemprop="programmingLanguage"]')
        .text()
        .trim(),
      name: title.text().trim(),
      stars: Number(
        $(element)
          .find('[aria-label="star"]')
          .parent()
          .text()
          .replace(',', '')
      ),
      url: url.resolve('https://github.com', path)
    });
  }

  return repositories;
}
