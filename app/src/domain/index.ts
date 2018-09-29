import { groupBy } from "lodash";

export interface ILanguage {
  color: string;
  id: string;
  name: string;
}

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
  "c",
  "c++",
  "c#",
  "clojure",
  "common-lisp",
  "crystal",
  "css",
  "dart",
  "elixir",
  "elm",
  "emacs-lisp",
  "erlang",
  "go",
  "groovy",
  "haskell",
  "java",
  "javascript",
  "julia",
  "kotlin",
  "lua",
  "ocaml",
  "perl",
  "php",
  "python",
  "r",
  "ruby",
  "rust",
  "scala",
  "scheme",
  "shell",
  "swift",
  "typescript",
  "vim-script",
  "vue",
  "webassembly"
];

export const specialLanguageIDs: string[] = [
  "", // all languages
  "unknown"
];

export const specialLanguages: { all: ILanguage; unknown: ILanguage } = {
  all: {
    color: "tomato",
    id: "",
    name: "All"
  },
  unknown: {
    color: "grey",
    id: "unknown",
    name: "Unknown languages"
  }
};

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
      date: new Date(Number(date)),
      repositories
    }));
}
