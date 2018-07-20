import axios from 'axios';
import cheerio = require('cheerio');
import * as url from 'url';

interface ILanguage {
  color: string;
  id: string;
  name: string;
}

export interface IRepository {
  date: number;
  description?: string;
  id: string;
  language?: ILanguage;
  name: string;
  stars: number;
  url: string;
}

function languageNameToID(name: string): string {
  return name.toLowerCase().replace(' ', '-');
}

export async function fetchTrendingRepositories(
  languageID?: string
): Promise<IRepository[]> {
  if (!languageID) {
    languageID = '';
  }

  const $ = cheerio.load(
    (await axios.get(
      `https://github.com/trending/${encodeURIComponent(languageID)}`
    )).data
  );
  const repositories: IRepository[] = [];
  const date = new Date().getTime();

  for (const element of $('ol.repo-list li').toArray()) {
    const title = $(element).find('h3');
    const path = title.find('a').prop('href');

    let language: ILanguage = null;
    const languageElement = $(element).find('[itemprop="programmingLanguage"]');

    if (languageElement.text().trim()) {
      const name = languageElement.text().trim();

      language = {
        color: languageElement.prev().css('background-color'),
        id: languageNameToID(name),
        name
      };
    }

    repositories.push({
      date,
      description: $(element)
        .find('p')
        .text()
        .trim(),
      id: (languageID || 'all') + path,
      language,
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
