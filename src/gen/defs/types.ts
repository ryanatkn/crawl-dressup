export type SchemaType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'array'
  | 'object'
  | 'null';

// TODO this is haphazard, just made to work, is not very useful/correct
export interface SchemaProp {
  [key: string]: any;
  type?: SchemaType | undefined; // TODO constrain type to enum - especially desired for exhaustive pattern matching - do we extend this with our own builtins? if so that type needs to be generated (that introduces the concept of dev-level code generation, because our dev code would then be dependent on generated code)
  title?: string;
  $ref?: string;
  items?: {
    $ref?: string;
    type?: SchemaType;
  };
  value?: any;
  properties?: {
    [key: string]: SchemaProp;
    // required?: string[];
  };
  required?: string[];
  anyOf?: SchemaProp[];
  allOf?: SchemaProp[];
  enum?: string[];
}

// TODO this is haphazard, just made to work, is not very useful/correct
export interface SchemaDef {
  [key: string]: any;
  type?: SchemaType;
  title: string;
  definitions?: {
    [key: string]: SchemaDef;
  };
  properties?: {
    [key: string]: SchemaProp;
    // required?: string[];
  };
  required?: string[];
  anyOf?: SchemaProp[];
  allOf?: SchemaProp[];
  code?: {
    declaration: string;
  };
}

// this is the main definition to gen an app - a plain JSON data structure
// TODO create json schema
export interface Clay extends SchemaDef {
  // $schema: 'http://json-schema.org/draft-04/schema#';
  type: 'object';
  // id: string;
  name: string;
  description: string;
  definitions: {
    [key: string]: SchemaDef;
    // Action: SchemaDef & {
    //   title: string;
    //   anyOf: {$ref: string}[];
    // };
  };
  properties: {
    [key: string]: SchemaProp;
    // required?: string[];
  };
}
