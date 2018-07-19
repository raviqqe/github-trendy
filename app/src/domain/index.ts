export interface ILanguage {
  name: string;
  path: string;
}

export const languages: ILanguage[] = [
  // `path` must be equivalent to GitHub Trending's paths.
  { name: 'All', path: 'all' },
  { name: 'C', path: 'c' },
  { name: 'Go', path: 'go' },
  { name: 'JavaScript', path: 'javascript' }
];
