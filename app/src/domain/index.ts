import { groupBy } from 'lodash';

export interface IRepository {
  date: number;
  [key: string]: any;
}

export interface IDay {
  date: Date;
  repositories: IRepository[];
}

export const languageIDs: string[] = [
  // IDs must be equivalent to GitHub Trending's paths.
  'c',
  'c++',
  'c#',
  'clojure',
  'common-lisp',
  'crystal',
  'css',
  'dart',
  'elixir',
  'emacs-lisp',
  'erlang',
  'go',
  'haskell',
  'java',
  'javascript',
  'julia',
  'kotlin',
  'lua',
  'ocaml',
  'perl',
  'php',
  'python',
  'r',
  'ruby',
  'rust',
  'scala',
  'scheme',
  'shell',
  'swift',
  'typescript',
  'vim-script',
  'vue'
];

export function roundTimestampToDate(timestamp: number): number {
  return new Date(new Date(timestamp).toDateString()).getTime();
}

export function repositoriesToDays(
  repositories: IRepository[]
): Array<{ date: Date; repositories: IRepository[] }> {
  return Object.entries(
    groupBy(repositories, ({ date }) => roundTimestampToDate(date))
  )
    .sort()
    .reverse()
    .map(([date, repositories]) => ({
      date: new Date(Number(date)),
      repositories
    }));
}
