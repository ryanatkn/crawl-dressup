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
    // problem is snapshot testing doesn't play nicely with ids

    import * as rand from '../../../utils/rand';
    import * as t from '../types';

    import {reducer} from './index';

    ${getActions(clay)
      .map(a =>
        `
        it('applies a ${a.title} against the store state', () => {
          const state = reducer(undefined, ${h.renderActionCreatorCall(
            clay,
            a,
          )});
          t.is<t.ClientState>(state);
        });
        `.trim(),
      )
      .join('\n\n')}
  `.trim();

export function tsReducerTestWriter(
  results: WriterResults,
  ctx: GenCtx,
): WriterResults {
  const path = `client/reducers/${ctx.clay.name}.reducer.gen.test.ts`;
  return {
    ...results,
    files: results.files.concat({
      path,
      contents: writeContents(path, ctx.clay, results),
      writerName: tsReducerTestWriter.name,
    }),
  };
}
