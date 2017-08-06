import * as h from '../helpers';

import {
  Clay,
  SchemaDef,
  SchemaProp,
  extractRefTypeTitle,
  getSuperDefs,
} from '../../defs';

/*

This code is really rough - it's a bunch of helpers for TypeScript code generation.
It needs a lot more features and clarity of design.
Most of it should probably be made more generic over the file type and moved to `./helpers.ts.

*/

export const primitiveTypes = [
  'string',
  'number',
  'integer', // hmm, is this typescript or jsonschema types?
  'boolean',
  'null',
  'undefined',
  'object',
  'any',
];

export function renderQmark(prop: SchemaProp, propName: string): '' | '?' {
  return prop.required && prop.required.includes(propName) ? '' : '?';
}

// TODO this is a huge hack
export function renderArrayType(prop: SchemaProp): string {
  if (prop.items) {
    if (prop.items.$ref) {
      return `${extractRefTypeTitle(prop.items.$ref)}[]`;
    } else if (prop.items.type) {
      return `${prop.items.type}[]`;
    }
  }
  return 'any[]';
}

export function renderTypeUnion(
  clay: Clay,
  prop: SchemaProp,
  refTypePrefix: string = 't.',
): string {
  return prop.oneOf
    ? prop.oneOf
        .map(v => renderPropertyType(clay, v, refTypePrefix))
        .join(' | ')
    : '';
}

export function renderEnumType(
  prop: SchemaProp,
  refTypePrefix: string = 't.',
  isDeclaration: boolean = false,
): string {
  if (!prop.enum) {
    return '';
  }
  if (!prop.title) {
    return prop.enum.map(v => `'${v}'`).join(' | ');
  }
  if (isDeclaration) {
    return `{ ${prop.enum.map(v => `${v}`).join(', ')} }`;
  }
  return `${refTypePrefix}${prop.title}`;
}

export function renderEnumValues(
  prop: SchemaProp,
  refTypePrefix: string = 't.',
): string {
  return prop.enum
    ? `[${prop.enum
        .map(
          v => (prop.title ? `${refTypePrefix}${prop.title}.${v}` : `'${v}'`),
        )
        .join(', ')}]`
    : '';
}

export function renderPrimitivePropertyType(
  clay: Clay,
  prop: SchemaProp,
): string {
  if (!prop.type) {
    return '';
  }
  switch (prop.type) {
    case 'object':
      return prop.properties
        ? `{${renderPropList(
            clay,
            prop,
            undefined,
            '',
            renderPropertyPairNameToType,
          )}}`
        : 'object'; // TODO this may cause probs
    case 'integer':
      return 'number';
    default:
      return prop.type;
  }
}

export function renderPropertyType(
  clay: Clay,
  prop: SchemaProp,
  refTypePrefix: string = 't.',
  isDeclaration: boolean = false,
): string {
  if (prop.$ref) {
    return prop.value !== undefined // TODO could replace all of this branching with a switch() over a declarative kind
      ? `${refTypePrefix}${extractRefTypeTitle(prop.$ref)}.${prop.value}`
      : `${refTypePrefix}${extractRefTypeTitle(prop.$ref)}`;
  } else if (prop.value !== undefined) {
    return `${JSON.stringify(prop.value)}`;
  } else if (prop.oneOf) {
    return renderTypeUnion(clay, prop, refTypePrefix);
  } else if (prop.enum) {
    return renderEnumType(prop, refTypePrefix, isDeclaration);
  } else if (prop.type) {
    if (primitiveTypes.includes(prop.type)) {
      return renderPrimitivePropertyType(clay, prop);
    } else if (prop.type === 'array') {
      return renderArrayType(prop);
    } else {
      return `'${prop.type}'`;
    }
  } else {
    return '';
  }
}

export function renderInterfaceExtendType(
  clay: Clay,
  prop: SchemaProp,
  refTypePrefix: string = 't.',
  isDeclaration: boolean = false,
): string {
  return prop.allOf
    ? `extends ${prop.allOf
        .map(p => renderPropertyType(clay, p, refTypePrefix, isDeclaration))
        .join(', ')} `
    : '';
}

export function renderRandomValue(
  clay: Clay,
  prop: SchemaProp,
  refTypePrefix: string = 't.',
): string {
  // TODO probably switch on the type of the property from a type union of SchemaProperty subtypes
  if (prop.properties || prop.allOf) {
    return `{${getSuperDefs(clay, prop as any) // TODO!!! this is a great example of the prop/def problem
      // TODO could do this more functionally using `flatten` or `flatMap`
      .reduce((kvPairs, p) => {
        if (!p.properties && !p.allOf) {
          throw new Error(`Unexpected missing properties for "${p.title}"`);
        }
        if (p.properties) {
          for (const propName in p.properties) {
            kvPairs.push(
              renderPropertyPairNameToValue(
                clay,
                p.properties[propName],
                propName,
                p,
                refTypePrefix,
              ),
            );
          }
        }
        return kvPairs;
      }, [] as string[])
      .filter(p => p)
      .join(', ')}}`;
  } else if (prop.$ref) {
    return prop.value !== undefined
      ? `${refTypePrefix}${h.extractRefTypeTitle(prop.$ref)}.${prop.value}` // TODO this is hardcoded for enums, or namespacing at least
      : `${refTypePrefix}mock${extractRefTypeTitle(prop.$ref)}()`; // TODO hmm? could do this at gen-time
  } else if (prop.value !== undefined) {
    return typeof prop.value === 'string'
      ? `'${prop.value}'`
      : JSON.stringify(prop.value);
  } else if (prop.oneOf) {
    return `sample([${prop.oneOf
      .map(p => renderRandomValue(clay, p, refTypePrefix))
      .join(', ')}]) as ${prop.title
      ? `${refTypePrefix}${prop.title}`
      : renderTypeUnion(clay, prop)}`; // TODO is hack to get around string literal problem from sample
  } else if (prop.enum) {
    return `sample(${renderEnumValues(prop)}) as ${renderEnumType(prop)}`; // TODO is hack to get around string literal problem from sample
  } else {
    switch (prop.type) {
      case 'string':
        return 'rand.str()';
      case 'integer':
        return 'rand.int()';
      case 'number':
        return 'rand.num()';
      case 'object': // TODO values?
        return `{}`;
      case 'null':
        return 'null';
      case 'boolean':
        return 'sample([true, false]) as boolean';
      case 'array': // TODO fill with some random items
        return `[]`;
      default:
        return `'FIXMEtype:${prop.type}'`;
    }
  }
}

export function renderPropertyPairNameToValue(
  clay: Clay,
  prop: SchemaProp,
  propName: string,
  parentProp: SchemaProp, // TODO this is unused and weird, see `renderPropList` below for more
  refTypePrefix: string = 't.',
): string {
  return `${propName}: ${renderRandomValue(clay, prop, refTypePrefix)}`;
}

export function renderPropertyPairNameToType(
  clay: Clay,
  prop: SchemaProp,
  propName: string,
  parentProp: SchemaProp,
  refTypePrefix: string = 't.',
): string {
  return `${propName}${renderQmark(parentProp, propName)}: ${renderPropertyType(
    clay,
    prop,
    refTypePrefix,
  )}`;
}

export function renderCallingArgs( // TODO rename?
  clay: Clay,
  prop: SchemaProp,
  propName: string,
  parentProp: SchemaProp,
  refTypePrefix: string = 't.',
): string {
  return renderRandomValue(clay, prop, refTypePrefix);
}

// TODO callingPropList vs declarationPropList
export function renderPropList(
  clay: Clay,
  prop: SchemaProp,
  separator: string = ', ',
  refTypePrefix: string = 't.',
  fn: typeof renderPropertyPairNameToValue = renderPropertyPairNameToValue, // TODO this is wonky
): string {
  return prop.properties
    ? Object.keys(prop.properties)
        .map(propName =>
          // tslint:disable-next-line:no-non-null-assertion
          fn(clay, prop.properties![propName], propName, prop, refTypePrefix),
        )
        .filter(p => p)
        .join(separator)
    : '';
}

export enum TypeDeclarationKind {
  TypeLiteral,
  Enum,
  Interface,
}

// TODO makes me think `SchemaProperty` should be a union type, instead of inferring it
export const inferTypeDeclarationKind = (
  def: SchemaDef,
): TypeDeclarationKind => {
  if (
    def.oneOf ||
    (def.type && def.type !== 'array' && def.type !== 'object')
  ) {
    return TypeDeclarationKind.TypeLiteral;
  } else if (def.enum) {
    return TypeDeclarationKind.Enum;
  } else {
    return TypeDeclarationKind.Interface;
  }
};

export function renderTypeDeclaration(clay: Clay, def: SchemaDef): string {
  const typeDeclarationKind = inferTypeDeclarationKind(def);
  switch (typeDeclarationKind) {
    case TypeDeclarationKind.TypeLiteral:
      return `
        export type ${def.title} = ${renderPropertyType(clay, def, '')};
      `.trim();
    case TypeDeclarationKind.Enum:
      return `
        export enum ${def.title} ${renderPropertyType(clay, def, '', true)};
      `.trim();
    case TypeDeclarationKind.Interface:
      return `
        export interface ${def.title} ${renderInterfaceExtendType(
        clay,
        def,
        '',
        false,
      )}{ ${renderPropList(clay, def, '; ', '', renderPropertyPairNameToType)} }
      `.trim();
    default:
      h.is<never>(typeDeclarationKind);
      throw Error();
  }
}

export function renderActionCreatorCall(
  clay: Clay,
  def: SchemaDef,
  refTypePrefix: string = 't.',
): string {
  return `
  ${refTypePrefix}${renderActionCreatorName(def)}(${renderPropList(
    clay,
    (def.properties && def.properties.payload) || {}, // TODO validate
    undefined,
    refTypePrefix,
    renderCallingArgs,
  )})
  `.trim();
}

export function renderPropertiesObjectLiteral(
  prop: SchemaProp,
  separator: string = ', ',
): string {
  return prop.type === 'object'
    ? `
      { ${(prop.properties && Object.keys(prop.properties).join(separator)) ||
        ''} }
      `.trim()
    : 'null'; // TODO should this be disallowed by types?
}

const ACTION_SUFFIX = 'Action';
const ACTION_SUFFIX_LENGTH = ACTION_SUFFIX.length;

// TODO validate
export function renderActionCreatorName(def: SchemaDef): string {
  return (
    def.title[0].toLowerCase() +
    def.title.slice(1, def.title.length - ACTION_SUFFIX_LENGTH)
  );
}

export function renderActionTypeValue(
  def: SchemaDef,
  refTypePrefix: string = 't.',
): string {
  return `${refTypePrefix}${def.title}`;
}
