import * as h from '../helpers';

import {GenCtx, WriterResults} from '../../types';

import {Clay} from '../../defs';

const writeContents = (
  path: string,
  clay: Clay,
  results: WriterResults,
): string =>
  `
  ${Object.keys(clay.definitions)
    .map(d => h.renderTypeDeclaration(clay, clay.definitions[d]))
    .join('\n\n')}
  `.trim();

export function tsTypeWriter(
  results: WriterResults,
  ctx: GenCtx,
): WriterResults {
  const path = `types/${ctx.clay.name}.types.gen.ts`;
  return {
    ...results,
    files: results.files.concat({
      path,
      contents: writeContents(path, ctx.clay, results),
      writerName: tsTypeWriter.name,
    }),
  };
}
