export type SchemaType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'array'
  | 'object'
  | 'null';

// TODO this is haphazard, just made to work, is not very useful/correct
export interface SchemaProperty {
  [key: string]: any;
  type?: SchemaType | undefined; // TODO constrain type to enum - especially desired for exhaustive pattern matching - do we extend this with our own builtins? if so that type needs to be generated (that introduces the concept of dev-level code generation, because our dev code would then be dependent on generated code)
  title?: string;
  $ref?: string;
  items?: {
    $ref?: string;
  };
  value?: any;
  properties?: {
    [key: string]: SchemaProperty;
    // required?: string[];
  };
  required?: string[];
  oneOf?: SchemaProperty[];
  allOf?: SchemaProperty[];
  enum?: string[];
}

// TODO this is haphazard, just made to work, is not very useful/correct
export interface SchemaDefinition {
  [key: string]: any;
  type?: SchemaType;
  title: string;
  definitions?: {
    [key: string]: SchemaDefinition;
  };
  properties?: {
    [key: string]: SchemaProperty;
    // required?: string[];
  };
  required?: string[];
  oneOf?: SchemaProperty[];
  allOf?: SchemaProperty[];
  code?: {
    declaration: string;
  };
}

// this is the main definition to gen an app - a plain JSON data structure
// TODO create json schema
export interface AppDef extends SchemaDefinition {
  $schema: 'http://json-schema.org/draft-04/schema#';
  type: SchemaType;
  id: string;
  name: string;
  description: string;
  definitions: {
    [key: string]: SchemaDefinition;
    Action: SchemaDefinition & {
      title: string;
      oneOf: {$ref: string}[];
    };
  };
  properties: {
    [key: string]: SchemaProperty;
    // required?: string[];
  };
}
