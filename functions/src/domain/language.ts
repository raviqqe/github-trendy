export interface ILanguage {
  color: string;
  id: string;
  name: string;
}

export function languageNameToID(name: string): string {
  return name.toLowerCase().replace(' ', '-');
}
