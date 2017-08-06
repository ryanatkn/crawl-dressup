import * as h from '../helpers';

import {GenCtx, WriterResults} from '../../types';

import {Clay} from '../../defs';

const writeContents = (
  path: string,
  clay: Clay,
  results: WriterResults,
): string =>
  `
  import {sample} from 'lodash';

  import * as rand from '../../utils/rand';
  import * as t from '../types';

  ${Object.keys(clay.definitions)
    .map(d => {
      const def = clay.definitions[d];
      return `
        export const mock${def.title} = (): t.${d} => (
          ${h.renderRandomValue(clay, def)}
        );
      `.trim();
    })
    .join('\n\n')}
  `.trim();

export function tsMockWriter(
  results: WriterResults,
  ctx: GenCtx,
): WriterResults {
  const path = `types/${ctx.clay.name}.mocks.gen.ts`;
  return {
    ...results,
    files: results.files.concat({
      path,
      contents: writeContents(path, ctx.clay, results),
      writerName: tsMockWriter.name,
    }),
  };
}
