import {
  IDay,
  IRepository,
  repositoriesToDays,
  roundTimestampToDate
} from "..";

const testDates: number[] = [new Date().getTime(), new Date(0).getTime()];

const testRepositories = [
  { date: testDates[0], name: "a" },
  { date: testDates[0], name: "b" },
  { date: testDates[1], name: "c" },
  { date: testDates[1], name: "d" }
] as IRepository[];

test("Convert repositories into days", () => {
  for (const { days, repositories } of [
    { days: [], repositories: [] },
    {
      days: [
        {
          date: roundTimestampToDate(testDates[0]),
          repositories: [testRepositories[0]]
        }
      ],
      repositories: [testRepositories[0]]
    },
    {
      days: [
        {
          date: roundTimestampToDate(testDates[0]),
          repositories: [testRepositories[0], testRepositories[1]]
        }
      ],
      repositories: [testRepositories[0], testRepositories[1]]
    },
    {
      days: [
        {
          date: roundTimestampToDate(testDates[0]),
          repositories: [testRepositories[0], testRepositories[1]]
        },
        {
          date: roundTimestampToDate(testDates[1]),
          repositories: [testRepositories[2], testRepositories[3]]
        }
      ],
      repositories: testRepositories
    }
  ]) {
    expect(repositoriesToDays(repositories)).toEqual(days);
  }
});
