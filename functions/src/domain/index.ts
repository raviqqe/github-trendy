import { groupBy } from "lodash";

import { IDay } from "./day";
import { IRepository } from "./repository";

export * from "./day";
export * from "./language";
export * from "./repository";

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
