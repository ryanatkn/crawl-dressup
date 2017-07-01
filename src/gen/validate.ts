import {last} from 'lodash';

import {Writer, WriterResults} from './types';

export const validateWriters = (writers: Writer[]): void => {
  for (const w of writers) {
    if (!w.name) {
      throw new Error(
        `Expected writer(${w}) to have a name prop - try exporting it as a named function`,
      );
    }
  }
};

export const validateResults = (results: WriterResults): void => {
  for (const f of results.files) {
    if ((last(f.path.split('/')) || '').indexOf('.gen.') === -1) {
      throw new Error(
        `Expected file path ${f.path} from ${f.writerName} to have ".gen."`,
      );
    }
  }
};
