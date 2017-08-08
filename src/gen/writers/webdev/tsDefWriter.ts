import * as h from '../helpers';
import * as prettier from 'prettier';

import {GenCtx, WriterResults} from '../../types';

import {Clay} from '../../defs';

const writeContents = (clay: Clay, prettierCfg: object): string =>
  `
  import {Clay} from '../../gen';

  export const clay: Clay = {
    ${Object.keys(clay).map(d => {
      if (d === 'definitions') {
        return `
          ${d}: {
              ${Object.keys(clay[d]).map(
                defName => `
                    ${defName}: ${JSON.stringify(
                  {
                    ...clay[d][defName],
                    code: {
                      declaration: prettier.format(
                        h.renderTypeDeclaration(
                          clay,
                          clay.definitions[defName],
                        ),
                        prettierCfg,
                      ),
                    },
                    title: defName,
                  },
                  null,
                  2,
                )}
              `,
              )}
          }
            `;
      } else {
        return `${d}: ${JSON.stringify(clay[d], null, 2)}`;
      }
    })}
  };
  `.trim();

export function tsDefWriter(
  results: WriterResults,
  ctx: GenCtx,
): WriterResults {
  const path = `defs/${ctx.clay.name}.clay.gen.ts`;
  return {
    ...results,
    files: results.files.concat({
      path,
      contents: writeContents(ctx.clay, ctx.prettierCfg),
      writerName: tsDefWriter.name,
    }),
  };
}
