export interface ILanguage {
  id: string;
  name: string;
}

export const languages: ILanguage[] = [
  // `id` must be equivalent to GitHub Trending's ids.
  { id: 'all', name: 'All' },
  { id: 'c', name: 'C' },
  { id: 'c++', name: 'C++' },
  { id: 'c#', name: 'C#' },
  { id: 'clojure', name: 'Clojure' },
  { id: 'common-lisp', name: 'Common Lisp' },
  { id: 'crystal', name: 'Crystal' },
  { id: 'css', name: 'CSS' },
  { id: 'dart', name: 'Dart' },
  { id: 'elixir', name: 'Elixir' },
  { id: 'emacs-lisp', name: 'Emacs Lisp' },
  { id: 'erlang', name: 'Erlang' },
  { id: 'go', name: 'Go' },
  { id: 'haskell', name: 'Haskell' },
  { id: 'java', name: 'Java' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'julia', name: 'Julia' },
  { id: 'kotlin', name: 'Kotlin' },
  { id: 'lua', name: 'Lua' },
  { id: 'ocaml', name: 'OCaml' },
  { id: 'perl', name: 'Perl' },
  { id: 'php', name: 'PHP' },
  { id: 'python', name: 'Python' },
  { id: 'r', name: 'R' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'rust', name: 'Rust' },
  { id: 'scala', name: 'Scala' },
  { id: 'scheme', name: 'Scheme' },
  { id: 'shell', name: 'Shell' },
  { id: 'swift', name: 'Swift' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'vim-script', name: 'Vim script' },
  { id: 'vue', name: 'Vue' },
  { id: 'unknown', name: 'Unknown languages' }
];
