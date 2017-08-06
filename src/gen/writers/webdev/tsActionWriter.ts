import * as h from '../helpers';

import {Clay, SchemaProp, getActions} from '../../defs';
import {GenCtx, WriterResults} from '../../types';

// TODO should probably be renamed
const writeContents = (clay: Clay): string =>
  `
  import * as t from '../types';

  ${getActions(clay)
    .map(a =>
      `
      export const ${h.renderActionCreatorName(a)} = (
        ${h.renderPropList(
          clay,
          (a.properties && a.properties.payload) || {},
          undefined,
          undefined,
          (
            _clay: Clay,
            prop: SchemaProp,
            propName: string,
            parentProp: SchemaProp,
          ): string =>
            propName === 'type'
              ? ''
              : h.renderPropertyPairNameToType(
                  clay,
                  prop,
                  propName,
                  parentProp,
                ),
        )}
      ): t.${a.title} => ({
        type: t.ActionType.${a.title},
        ${a.properties && a.properties.payload
          ? `payload: ${h.renderPropertiesObjectLiteral(a.properties.payload)},`
          : ''}
      })
      `.trim(),
    )
    .join('\n\n')}

  `.trim();

export function tsActionWriter(
  results: WriterResults,
  ctx: GenCtx,
): WriterResults {
  const path = `client/actions/${ctx.clay.name}.actions.gen.ts`;
  return {
    ...results,
    files: results.files.concat({
      path,
      contents: writeContents(ctx.clay),
      writerName: tsActionWriter.name,
    }),
  };
}
