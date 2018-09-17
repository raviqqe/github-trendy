import {
  IDay,
  IRepository,
  repositoriesToDays,
  roundTimestampToDate
} from "..";

const testDates: Date[] = [new Date(), new Date(0)];

const testRepositories: IRepository[] = [
  { date: testDates[0].getTime(), name: "a" },
  { date: testDates[0].getTime(), name: "b" },
  { date: testDates[1].getTime(), name: "c" },
  { date: testDates[1].getTime(), name: "d" }
];

function roundDate(date: Date): Date {
  return new Date(roundTimestampToDate(date.getTime()));
}

test("Convert repositories into days", () => {
  for (const { days, repositories } of [
    { days: [], repositories: [] },
    {
      days: [
        {
          date: roundDate(testDates[0]),
          repositories: [testRepositories[0]]
        }
      ],
      repositories: [testRepositories[0]]
    },
    {
      days: [
        {
          date: roundDate(testDates[0]),
          repositories: [testRepositories[0], testRepositories[1]]
        }
      ],
      repositories: [testRepositories[0], testRepositories[1]]
    },
    {
      days: [
        {
          date: roundDate(testDates[0]),
          repositories: [testRepositories[0], testRepositories[1]]
        },
        {
          date: roundDate(testDates[1]),
          repositories: [testRepositories[2], testRepositories[3]]
        }
      ],
      repositories: testRepositories
    }
  ]) {
    expect(repositoriesToDays(repositories)).toEqual(days);
  }
});
