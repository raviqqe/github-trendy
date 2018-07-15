import axios from 'axios';
import cheerio = require('cheerio');
import * as url from 'url';

export interface IRepository {
  name: string;
  url: string;
}

export async function fetchTrendingRepositories(): Promise<IRepository[]> {
  const $ = cheerio.load((await axios.get('https://github.com/trending')).data);
  const repositories: IRepository[] = [];

  for (const element of $('ol.repo-list li').toArray()) {
    const title = $(element).find('h3');

    repositories.push({
      name: title.text(),
      url: url.resolve('https://github.com', title.find('a').prop('href'))
    });
  }

  return repositories;
}
