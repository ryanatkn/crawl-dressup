import {Clay} from '../../gen/defs/types';

export const validateClay = (clay: any): Clay => {
  if (clay.definitions) {
    // TODO should this be required?
    for (const d in clay.definitions) {
      const def = clay.definitions[d];
      const {title, required} = def;

      if (!title) {
        throw new Error(`Definition "${d}" needs a title`);
      }
      if (title !== d) {
        throw new Error(
          `Definition "${d}" expected to be same as title "${title}"`,
        );
      }

      // Verify that the `required` field points to valid properties
      if (required) {
        for (const r of required) {
          if (!def.properties[r]) {
            throw new Error(
              `Definition "${d}" has a required property "${r}" that does not match any properties`,
            );
          }
        }
      }
    }
  }
  // TODO validate `patternProperties`
  // TODO lots of other validation..including schema? or leave that to higher level check?
  return clay;
};
