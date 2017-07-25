import {AppDef} from '../../gen/defs/types';

export const validateAppDef = (def: any): AppDef => {
  if (def.definitions) {
    // TODO should this be required?
    for (const d in def.definitions) {
      if (!def.definitions[d].title) {
        throw new Error(`Definition "${d}" needs a title`);
      }
    }
  }
  // TODO validate `patternProperties`
  // TODO lots of other validation..including schema? or leave that to higher level check?
  return def;
};
