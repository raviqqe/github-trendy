import { ILanguage } from "./language";

export interface IRepository {
  date: number;
  description?: string;
  id: string;
  language?: ILanguage;
  name: string;
  stars: number;
  url: string;
}
