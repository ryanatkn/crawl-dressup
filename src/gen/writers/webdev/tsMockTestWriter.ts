// import * as h from '../helpers';

import {GenCtx, WriterResults} from '../../types';

import {Clay} from '../../defs';

const writeContents = (
  path: string,
  clay: Clay,
  results: WriterResults,
): string =>
  `
  import * as Ajv from 'ajv';

  import * as t from '../types';
  import * as mocks from './app.mocks.gen';
  import {clay} from '../defs/app.clay.gen';

  /* tslint:disable:no-console */

  const ajv = new Ajv();
  for (const d in clay.definitions) {
    ajv.addSchema(clay.definitions[d]);
  }

  ${Object.keys(clay.definitions)
    .map(d => {
      // const def = clay.definitions[d];
      return `
        it('mock def "${d}"', () => {
          const m = mocks.mock${d}();
          t.is<t.${d}>(m);
          const v = ajv.validate('${d}', m);
          expect(ajv.errors).toBeNull();
          expect(v).toBeTruthy();
        });
      `.trim();
    })
    .join('\n\n')}
  `.trim();

export function tsMockTestWriter(
  results: WriterResults,
  ctx: GenCtx,
): WriterResults {
  const path = `types/${ctx.clay.name}.mocks.gen.test.ts`;
  return {
    ...results,
    files: results.files.concat({
      path,
      contents: writeContents(path, ctx.clay, results),
      writerName: tsMockTestWriter.name,
    }),
  };
}
