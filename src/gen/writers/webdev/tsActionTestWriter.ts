import * as h from '../helpers';

import {Clay, getActions} from '../../defs';
import {GenCtx, WriterResults} from '../../types';

const writeContents = (
  path: string,
  clay: Clay,
  results: WriterResults,
): string =>
  `
    // TODO make these tests more robust - like with snapshot testing

    import * as rand from '../../../utils/rand';
    import * as t from '../types';

    ${getActions(clay)
      .map(a =>
        `
        it('calls the ${a.title} creator', () => {
          const action = ${h.renderActionCreatorCall(clay, a)};
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
  const path = `client/actions/${ctx.clay.name}.actions.gen.test.ts`;
  return {
    ...results,
    files: results.files.concat({
      path,
      contents: writeContents(path, ctx.clay, results),
      writerName: tsActionTestWriter.name,
    }),
  };
}
