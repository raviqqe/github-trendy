import { groupBy } from 'lodash';

export interface IRepository {
  date: number;
  [key: string]: any;
}

export interface IDay {
  date: number;
  repositories: IRepository[];
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
