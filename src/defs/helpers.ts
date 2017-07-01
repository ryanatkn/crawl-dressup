import {last} from 'lodash';

import * as defs from '../defs';

// TODO is hacky, should probably follow relative path on def tree.
export const extractRefTypeTitle = ($ref: string): string =>
  last($ref.split('/')) || '';

export const lookupDef = (
  d: defs.AppDef,
  $ref: string,
): defs.SchemaDefinition => d.definitions[extractRefTypeTitle($ref)];

export const getActions = (d: defs.AppDef): defs.SchemaDefinition[] =>
  d.definitions.Action.oneOf.map(a => lookupDef(d, a.$ref || ''));

// TODO check recursively
// export const inheritsFrom = ($ref: string) => (
//   d: defs.SchemaDefinition,
// ): boolean => !!d.allOf && d.allOf.some(a => a.$ref === $ref);
