import {AppDef} from '../../gen/defs/types';

export const validateAppDef = (def: any): AppDef => {
  if (def.definitions) {
    // TODO should this be required?
    for (const d in def.definitions) {
      const definition = def.definitions[d];
      const {title} = definition;
      if (!title) {
        throw new Error(`Definition "${d}" needs a title`);
      }
      if (title !== d) {
        throw new Error(
          `Definition "${d}" expected to be same as title "${title}"`,
        );
      }
    }
  }
  // TODO validate `patternProperties`
  // TODO lots of other validation..including schema? or leave that to higher level check?
  return def;
};
