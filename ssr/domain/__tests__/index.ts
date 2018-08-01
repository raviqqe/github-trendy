import * as lodash from 'lodash';
import { languageIDs, specialLanguageIDs } from '..';

test('Check no intersection of language IDs', () => {
  expect(lodash.intersection(languageIDs, specialLanguageIDs)).toEqual([]);
});
