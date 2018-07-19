export interface ILanguage {
  name: string;
  path: string;
}

export const languages: ILanguage[] = [
  // `path` must be equivalent to GitHub Trending's paths.
  { name: 'All', path: 'all' },
  { name: 'C', path: 'c' },
  { name: 'C#', path: 'c#' },
  { name: 'C++', path: 'c++' },
  { name: 'Clojure', path: 'clojure' },
  { name: 'Common Lisp', path: 'common-lisp' },
  { name: 'Crystal', path: 'crystal' },
  { name: 'CSS', path: 'css' },
  { name: 'Dart', path: 'dart' },
  { name: 'Elixir', path: 'elixir' },
  { name: 'Emacs Lisp', path: 'emacs-lisp' },
  { name: 'Erlang', path: 'erlang' },
  { name: 'Go', path: 'go' },
  { name: 'Haskell', path: 'haskell' },
  { name: 'Java', path: 'java' },
  { name: 'JavaScript', path: 'javascript' },
  { name: 'Julia', path: 'julia' },
  { name: 'Kotlin', path: 'kotlin' },
  { name: 'Lua', path: 'lua' },
  { name: 'OCaml', path: 'ocaml' },
  { name: 'Perl', path: 'perl' },
  { name: 'PHP', path: 'php' },
  { name: 'Python', path: 'python' },
  { name: 'R', path: 'r' },
  { name: 'Ruby', path: 'ruby' },
  { name: 'Rust', path: 'rust' },
  { name: 'Scala', path: 'scala' },
  { name: 'Scheme', path: 'scheme' },
  { name: 'Shell', path: 'shell' },
  { name: 'Swift', path: 'swift' },
  { name: 'TypeScript', path: 'typescript' },
  { name: 'Vim script', path: 'vim-script' },
  { name: 'Vue', path: 'vue' },
  { name: 'Unknown languages', path: 'unknown' }
];
