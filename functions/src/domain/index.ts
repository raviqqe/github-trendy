import { groupBy } from 'lodash';

export interface ILanguage {
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

export interface IDay {
  date: number;
  repositories: IRepository[];
}

export function languageNameToID(name: string): string {
  return name.toLowerCase().replace(' ', '-');
}

export function roundTimestampToDate(timestamp: number): number {
  return new Date(new Date(timestamp).toDateString()).getTime();
}

export function repositoriesToDays(repositories: IRepository[]): IDay[] {
  return Object.entries(
    groupBy(repositories, ({ date }) => roundTimestampToDate(date))
  )
    .sort()
    .reverse()
    .map(([date, repositories]) => ({
      date: Number(date),
      repositories
    }));
}
