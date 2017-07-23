import {AppDef, SchemaDefinition} from './types';

import {last} from 'lodash';

// TODO is hacky, should probably follow relative path on def tree.
export const extractRefTypeTitle = ($ref: string): string =>
  last($ref.split('/')) || '';

export const lookupDef = (d: AppDef, $ref: string): SchemaDefinition =>
  d.definitions[extractRefTypeTitle($ref)];

export const getActions = (d: AppDef): SchemaDefinition[] =>
  (d.definitions.Action.oneOf as any).map((a: any) =>
    lookupDef(d, a.$ref || ''),
  );

// TODO check recursively
// export const inheritsFrom = ($ref: string) => (
//   d: SchemaDefinition,
// ): boolean => !!d.allOf && d.allOf.some(a => a.$ref === $ref);
