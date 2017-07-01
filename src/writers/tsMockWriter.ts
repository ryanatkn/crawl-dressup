import {AppDef} from '../defs';
import {GenCtx, WriterResults} from '../gen';

import * as h from './helpers';

const writeContents = (
  path: string,
  def: AppDef,
  results: WriterResults,
): string =>
  `
  import {sample} from 'lodash';

  import * as t from '../types';
  import * as rand from '../utils/rand';

  ${Object.keys(def.definitions)
    .map(d => {
      const definition = def.definitions[d];
      return `
        export const mock${definition.title} = (): t.${d} => (
          ${h.renderRandomValue(definition)}
        );
      `.trim();
    })
    .join('\n\n')}
  `.trim();

export function tsMockWriter(
  results: WriterResults,
  ctx: GenCtx,
): WriterResults {
  const path = `../types/${ctx.def.name}.mocks.gen.ts`;
  return {
    ...results,
    files: results.files.concat({
      path,
      contents: writeContents(path, ctx.def, results),
      writerName: tsMockWriter.name,
    }),
  };
}
