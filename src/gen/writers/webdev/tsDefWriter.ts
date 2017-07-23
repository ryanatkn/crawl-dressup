import * as h from '../helpers';
import * as prettier from 'prettier';

import {GenCtx, WriterResults} from '../../types';

import {AppDef} from '../../defs';

const writeContents = (def: AppDef, prettierCfg: object): string =>
  `
  import {AppDef} from '../../gen';

  export const ${def.name}Def: AppDef = {
    ${Object.keys(def).map(d => {
      if (d === 'definitions') {
        return `
          ${d}: {
              ${Object.keys(def[d]).map(
                defName => `
                    ${defName}: ${JSON.stringify(
                  {
                    ...def[d][defName],
                    code: {
                      declaration: prettier.format(
                        h.renderTypeDeclaration(def.definitions[defName]),
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
        return `${d}: ${JSON.stringify(def[d], null, 2)}`;
      }
    })}
  };
  `.trim();

export function tsDefWriter(
  results: WriterResults,
  ctx: GenCtx,
): WriterResults {
  const path = `defs/${ctx.def.name}.def.gen.ts`;
  return {
    ...results,
    files: results.files.concat({
      path,
      contents: writeContents(ctx.def, ctx.prettierCfg),
      writerName: tsDefWriter.name,
    }),
  };
}
