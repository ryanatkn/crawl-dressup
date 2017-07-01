import * as defs from '../../defs';
import * as h from '../helpers';

/*

This code is really rough - it's a bunch of helpers for TypeScript code generation.
It needs a lot more features and clarity of design.
Most of it should probably be made more generic over the file type and moved to `./helpers.ts.

*/

export const primitiveTypes = [
  'string',
  'number',
  'boolean',
  'null',
  'undefined',
  'object',
  'any',
];

export function renderQmark(
  prop: defs.SchemaProperty,
  propName: string,
): '' | '?' {
  return prop.required && prop.required.includes(propName) ? '' : '?';
}

export function renderArrayType(prop: defs.SchemaProperty): string {
  return prop.items && prop.items.$ref
    ? defs.extractRefTypeTitle(prop.items.$ref)
    : ''; // TODO this is a huge hack
}

export function renderTypeUnion(
  prop: defs.SchemaProperty,
  refTypePrefix: string = 't.',
): string {
  return prop.oneOf
    ? prop.oneOf.map(v => renderPropertyType(v, refTypePrefix)).join(' | ')
    : '';
}

export function renderEnumType(
  prop: defs.SchemaProperty,
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
    return `
      {
        ${prop.enum.map(v => `${v}`).join(',\n')}
      }
    `.trim();
  }
  return `${refTypePrefix}${prop.title}`;
}

export function renderEnumTypeUnion(prop: defs.SchemaProperty): string {
  return prop.enum ? prop.enum.map(v => `'${v}'`).join(' | ') : '';
}

export function renderEnumValues(
  prop: defs.SchemaProperty,
  refTypePrefix: string = 't.',
): string {
  return prop.enum
    ? prop.enum
        .map(
          v => (prop.title ? `${refTypePrefix}${prop.title}.${v}` : `'${v}'`),
        )
        .join(', ')
    : '';
}

export function renderPrimitivePropertyType(prop: defs.SchemaProperty): string {
  if (prop.type === 'object') {
    // return prop.type;
    return `
      {
        ${renderPropList(prop, undefined, '', renderPropertyPairNameToType)}
      }
    `;
  } else {
    return prop.type || '';
  }
}

export function renderPropertyType(
  prop: defs.SchemaProperty,
  refTypePrefix: string = 't.',
  isDeclaration: boolean = false,
): string {
  if (prop.$ref) {
    return prop.value !== undefined // TODO could replace all of this branching with a switch() over a declarative kind
      ? `${refTypePrefix}${defs.extractRefTypeTitle(prop.$ref)}.${prop.value}`
      : `${refTypePrefix}${defs.extractRefTypeTitle(prop.$ref)}`;
  } else if (prop.value !== undefined) {
    return `${JSON.stringify(prop.value)}`;
  } else if (prop.type && primitiveTypes.includes(prop.type)) {
    return renderPrimitivePropertyType(prop);
  } else if (prop.type === 'array') {
    return `${renderArrayType(prop)}[]`;
  } else if (prop.oneOf) {
    return renderTypeUnion(prop, refTypePrefix);
  } else if (prop.enum) {
    return renderEnumType(prop, refTypePrefix, isDeclaration);
  } else {
    return `'${prop.type}'`;
  }
}

export function renderInterfaceExtendType(
  prop: defs.SchemaProperty,
  refTypePrefix: string = 't.',
  isDeclaration: boolean = false,
): string {
  return prop.allOf
    ? `extends ${prop.allOf
        .map(p => renderPropertyType(p, refTypePrefix, isDeclaration))
        .join(', ')}`
    : '';
}

export function renderRandomValue(
  prop: defs.SchemaProperty,
  refTypePrefix: string = 't.',
): string {
  // TODO huge temp hack ...wait that's everything, and it's not temp at all
  if (prop.properties) {
    return `
      {
        ${renderPropList(prop)}
      }
    `.trim();
  } else if (prop.$ref) {
    return prop.value !== undefined
      ? `${refTypePrefix}${h.extractRefTypeTitle(prop.$ref)}.${prop.value}` // TODO this is hardcoded for enums, or namespacing at least
      : `${refTypePrefix}mock${defs.extractRefTypeTitle(prop.$ref)}()`; // TODO hmm? could do this at gen-time
  } else if (prop.value !== undefined) {
    return typeof prop.value === 'string'
      ? `'${prop.value}'`
      : JSON.stringify(prop.value);
  } else if (prop.oneOf) {
    return `sample([${prop.oneOf
      .map(p => renderRandomValue(p, refTypePrefix))
      .join(', ')}]) as ${prop.title
      ? `${refTypePrefix}${prop.title}`
      : renderTypeUnion(prop)}`; // TODO is hack to get around string literal problem from sample
  } else if (prop.enum) {
    return `sample([${renderEnumValues(prop)}]) as ${renderEnumType(prop)}`; // TODO is hack to get around string literal problem from sample
  } else {
    switch (prop.type) {
      case 'string':
        return prop.title === 'Id' ? 'rand.id()' : 'rand.str()'; // TODO refactor
      case 'integer':
        return 'rand.int()';
      case 'number':
        return 'rand.num()';
      case 'object':
        return `{}`;
      case 'null':
        return 'null';
      case 'boolean':
        return 'sample([true, false]) as boolean';
      case 'array':
        return `[]`;
      default:
        return `'FIXMEtype:${prop.type}'`;
    }
  }
}

export function renderPropertyPairNameToValue(
  prop: defs.SchemaProperty,
  propName: string,
  parentProp: defs.SchemaProperty,
  refTypePrefix: string = 't.',
): string {
  return `${propName}: ${renderRandomValue(prop, refTypePrefix)}`;
}

export function renderPropertyPairNameToType(
  prop: defs.SchemaProperty,
  propName: string,
  parentProp: defs.SchemaProperty,
  refTypePrefix: string = 't.',
): string {
  return `${propName}${renderQmark(parentProp, propName)}: ${renderPropertyType(
    prop,
    refTypePrefix,
  )}`;
}

export function renderCallingArgs(
  prop: defs.SchemaProperty,
  propName: string,
  parentProp: defs.SchemaProperty,
  refTypePrefix: string = 't.',
): string {
  return renderRandomValue(prop, refTypePrefix);
}

// TODO callingPropList vs declarationPropList
export function renderPropList(
  prop: defs.SchemaProperty,
  separator: string = ',\n',
  refTypePrefix: string = 't.',
  fn: typeof renderPropertyPairNameToValue = renderPropertyPairNameToValue,
): string {
  return prop.properties
    ? Object.keys(prop.properties)
        .map(propName =>
          // tslint:disable-next-line:no-non-null-assertion
          fn(prop.properties![propName], propName, prop, refTypePrefix),
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

// TODO makes me think `defs.SchemaProperty` should be a union type, instead of inferring it
export const inferTypeDeclarationKind = (
  definition: defs.SchemaDefinition,
): TypeDeclarationKind => {
  if (
    definition.oneOf ||
    (definition.type &&
      definition.type !== 'array' &&
      definition.type !== 'object')
  ) {
    return TypeDeclarationKind.TypeLiteral;
  } else if (definition.enum) {
    return TypeDeclarationKind.Enum;
  } else {
    return TypeDeclarationKind.Interface;
  }
};

export function renderTypeDeclaration(
  definition: defs.SchemaDefinition,
): string {
  // TODO this should be a helper
  const typeDeclarationKind = inferTypeDeclarationKind(definition);
  switch (typeDeclarationKind) {
    case TypeDeclarationKind.TypeLiteral:
      return `
        export type ${definition.title} = ${renderPropertyType(definition, '')};
      `.trim();
    case TypeDeclarationKind.Enum:
      return `
        export enum ${definition.title}${renderPropertyType(
        definition,
        '',
        true,
      )};
      `.trim();
    case TypeDeclarationKind.Interface:
      return `
        export interface ${definition.title} ${renderInterfaceExtendType(
        definition,
        '',
        false,
      )} {
          ${renderPropList(definition, ';\n', '', renderPropertyPairNameToType)}
        }
      `.trim();
    default:
      h.is<never>(typeDeclarationKind);
      throw Error();
  }
}

export function renderActionCreatorCall(
  def: defs.SchemaDefinition,
  refTypePrefix: string = 't.',
): string {
  return `
  ${refTypePrefix}${renderActionCreatorName(def)}(
    ${renderPropList(
      (def.properties && def.properties.payload) || {},
      undefined,
      refTypePrefix,
      renderCallingArgs,
    )}
  )
  `.trim();
}

export function renderPropertiesObjectLiteral(
  prop: defs.SchemaProperty,
  separator: string = ',\n',
): string {
  return prop.type === 'object'
    ? `
      {
        ${(prop.properties && Object.keys(prop.properties).join(separator)) ||
          ''}
      }
      `.trim()
    : 'null';
}

const ACTION_SUFFIX = 'Action';
const ACTION_SUFFIX_LENGTH = ACTION_SUFFIX.length;

export function renderActionCreatorName(def: defs.SchemaDefinition): string {
  return (
    def.title[0].toLowerCase() +
    def.title.slice(1, def.title.length - ACTION_SUFFIX_LENGTH)
  );
}

export function renderActionTypeValue(
  def: defs.SchemaDefinition,
  refTypePrefix: string = 't.',
): string {
  return `${refTypePrefix}${def.title}`;
}
