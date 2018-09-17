import { languageNameToID } from "../language";

test("Convert language name to ID", () => {
  for (const [name, id] of [
    ["C", "c"],
    ["C++", "c++"],
    ["C#", "c#"],
    ["Common Lisp", "common-lisp"]
  ]) {
    expect(languageNameToID(name)).toBe(id);
  }
});
