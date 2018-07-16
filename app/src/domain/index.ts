export interface ILanguage {
  name: string;
  path: string;
}

export const languages: ILanguage[] = [
  { name: 'All', path: 'all' },
  { name: 'C', path: 'c' },
  { name: 'Go', path: 'go' },
  { name: 'JavaScript', path: 'javascript' }
];
