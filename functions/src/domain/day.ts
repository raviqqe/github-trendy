import { IRepository } from './repository';

export interface IDay {
  date: number;
  repositories: IRepository[];
}
