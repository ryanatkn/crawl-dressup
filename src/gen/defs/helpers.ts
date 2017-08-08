import {Clay, SchemaDef} from './types';

import {last} from 'lodash';

// TODO is hacky, should probably follow relative path on def tree.
export const extractRefTypeTitle = ($ref: string): string =>
  last($ref.split('/')) || '';

// Mutates `clay` by merging in all of the data from `partial`,
// overwriting any conflicts.
export const mergeClayPartial = (clay: Clay, partial?: Partial<Clay>): Clay => {
  if (!partial) return clay;
  if (partial.definitions) {
    for (const p in partial.definitions) {
      clay.definitions[p] = partial.definitions[p];
    }
  }
  if (partial.properties) {
    for (const p in partial.properties) {
      clay.properties[p] = partial.properties[p];
    }
  }
  return clay;
};

export const lookupDef = (clay: Clay, $ref: string): SchemaDef =>
  clay.definitions[extractRefTypeTitle($ref)];

// TODO get unflattened tree as well?
export const getSuperDefs = (clay: Clay, def: SchemaDef): SchemaDef[] => {
  const defs: SchemaDef[] = [];
  if (def.allOf) {
    for (const d of def.allOf) {
      // TODO revisit this janky validation - probably move to clay validator
      // TODO should $ref be the only supported pattern for allOf? maybe not
      const keys = Object.keys(d);
      if (
        !(
          (keys.length === 1 && d.$ref) ||
          (keys.length === 2 && d.$ref && d.title)
        )
      ) {
        throw Error(`Expected ${def.title}.allOf to be only $refs`);
      }
      const superDefs = getSuperDefs(clay, lookupDef(clay, d.$ref));
      for (const s of superDefs) {
        if (defs.indexOf(s) === -1) {
          defs.push(s);
        }
      }
    }
  }
  if (defs.indexOf(def) === -1) {
    defs.push(def);
  }
  return defs;
};

// TODO move this out of gen - to where? - and write tests
export const getActions = (clay: Clay): SchemaDef[] =>
  (clay.definitions.Action.anyOf as any).map((a: any) =>
    lookupDef(clay, a.$ref || ''),
  );

// TODO check recursively
// export const inheritsFrom = ($ref: string) => (
//   d: SchemaDefinition,
// ): boolean => !!d.allOf && d.allOf.some(a => a.$ref === $ref);
