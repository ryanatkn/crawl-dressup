import {AppDef, getActions} from '../defs';
import {GenCtx, WriterResults} from '../gen';

import * as h from './helpers';

const writeContents = (
  path: string,
  def: AppDef,
  results: WriterResults,
): string =>
  `
    // TODO make these tests more robust - like with snapshot testing

    import * as t from '../types';
    import * as rand from '../utils/rand';

    ${getActions(def)
      .map(a =>
        `
        it('calls the ${a.title} creator', () => {
          const action = ${h.renderActionCreatorCall(a)};
          t.is<${h.renderActionTypeValue(a)}>(action);
        });
        `.trim(),
      )
      .join('\n\n')}
  `.trim();

export function tsActionTestWriter(
  results: WriterResults,
  ctx: GenCtx,
): WriterResults {
  const path = `../actions/${ctx.def.name}.actions.gen.test.ts`;
  return {
    ...results,
    files: results.files.concat({
      path,
      contents: writeContents(path, ctx.def, results),
      writerName: tsActionTestWriter.name,
    }),
  };
}
