import * as h from './tsHelpers';

// it(' ', () => {
//   expect().toBe();
// });

it('renders an optional question mark for properties that are not required', () => {
  expect(h.renderQmark({}, 'bar')).toBe('?');
  expect(h.renderQmark({required: ['foo']}, 'foo')).toBe('');
  expect(h.renderQmark({required: ['foo']}, 'bar')).toBe('?');
});

it('renders an array type', () => {
  // TODO consider making this check for `type=array`, would add another case that renders '' if not
  expect(h.renderArrayType({})).toBe('[]');
  expect(h.renderArrayType({items: {$ref: '#/definitions/Foo'}})).toBe('Foo[]');
});

it('renders a type union', () => {
  expect(h.renderTypeUnion({})).toBe('');
  expect(
    h.renderTypeUnion({
      oneOf: [
        {$ref: '#/definitions/Foo'},
        {$ref: '#/definitions/Bar'},
        {$ref: '#/definitions/Baz'},
      ],
    }),
  ).toBe('t.Foo | t.Bar | t.Baz');
  expect(
    h.renderTypeUnion(
      {
        oneOf: [
          {$ref: '#/definitions/Foo'},
          {$ref: '#/definitions/Bar'},
          {$ref: '#/definitions/Baz'},
        ],
      },
      'types.',
    ),
  ).toBe('types.Foo | types.Bar | types.Baz');
});

it(`renders an enum's type`, () => {
  expect(h.renderEnumType({})).toBe('');
  expect(h.renderEnumType({enum: ['foo', 'bar', 'baz']})).toBe(
    `'foo' | 'bar' | 'baz'`,
  );
  const testEnum = {title: 'TestEnum', enum: ['Foo', 'Bar', 'Baz']};
  expect(h.renderEnumType(testEnum, undefined, true)).toBe(`{ Foo, Bar, Baz }`);
  expect(h.renderEnumType(testEnum, 'test.')).toBe(`test.TestEnum`);
});

it(`renders an enum's values`, () => {
  expect(h.renderEnumValues({})).toBe('');
  expect(h.renderEnumValues({enum: ['foo', 'bar', 'baz']})).toBe(
    `['foo', 'bar', 'baz']`,
  );
  const testEnum = {title: 'TestEnum', enum: ['Foo', 'Bar', 'Baz']};
  expect(h.renderEnumValues(testEnum)).toBe(
    '[t.TestEnum.Foo, t.TestEnum.Bar, t.TestEnum.Baz]',
  );
  expect(h.renderEnumValues(testEnum, 'test.')).toBe(
    '[test.TestEnum.Foo, test.TestEnum.Bar, test.TestEnum.Baz]',
  );
});

it('renders a primitive property type', () => {
  expect(h.renderPrimitivePropertyType({})).toBe('');
  expect(h.renderPrimitivePropertyType({type: 'string'})).toBe('string');
  expect(h.renderPrimitivePropertyType({type: 'null'})).toBe('null');
  expect(
    h.renderPrimitivePropertyType({
      type: 'object',
      properties: {
        foo: {type: 'string'},
        bar: {type: 'number'},
      },
      required: ['foo'],
    }),
  ).toBe('{foo: string, bar?: number}');
});

it(`renders a property's type`, () => {
  expect(h.renderPropertyType({})).toBe('');
  expect(h.renderPropertyType({$ref: '#/definitions/Foo'})).toBe(`t.Foo`);
  expect(h.renderPropertyType({value: 5})).toBe('5');
  expect(
    h.renderPropertyType({
      oneOf: [{type: 'string'}, {type: 'null'}],
    }),
  ).toBe('string | null');
  const testEnum = {title: 'TestEnum', enum: ['Foo', 'Bar']};
  expect(h.renderPropertyType(testEnum, undefined, true)).toBe(`{ Foo, Bar }`);
  expect(h.renderPropertyType(testEnum, 'test.')).toBe(`test.TestEnum`);
  expect(h.renderPropertyType({type: 'boolean'})).toBe('boolean');
});

it(`renders the extends portion of an interface for a property`, () => {
  expect(h.renderInterfaceExtendType({})).toBe('');
  const prop = {
    allOf: [{$ref: '#/definitions/Foo'}, {$ref: '#/definitions/Bar'}],
  };
  expect(h.renderInterfaceExtendType(prop)).toBe('extends t.Foo, t.Bar ');
  expect(h.renderInterfaceExtendType(prop, 'test.')).toBe(
    'extends test.Foo, test.Bar ',
  );
});

// TODO possibly `mockRandomProperty` and just run it 100x,
// or systemically mock each type of possible property
// makes me think property type should be a union type,
// and just enumerate each possible type of property as a definition
it(`renders a random value for a property`, () => {
  // `properties`
  expect(
    h.renderRandomValue({properties: {foo: {value: 5}, bar: {value: 'hi'}}}),
  ).toBe(`{foo: 5, bar: 'hi'}`);

  // `$ref`
  expect(h.renderRandomValue({$ref: '#/definitions/Foo'})).toBe('t.mockFoo()');
  expect(
    h.renderRandomValue({$ref: '#/definitions/EnumDef', value: 'EnumValue'}),
  ).toBe('t.EnumDef.EnumValue');

  // `value`
  expect(h.renderRandomValue({value: 5})).toBe('5');
  expect(h.renderRandomValue({value: 'hi'})).toBe(`'hi'`);
  expect(h.renderRandomValue({value: {foo: 5}})).toBe(`{"foo":5}`);

  // `oneOf`
  expect(
    h.renderRandomValue({
      title: 'Foo',
      oneOf: [{$ref: '#/definitions/Bar'}, {value: 5}],
    }),
  ).toBe('sample([t.mockBar(), 5]) as t.Foo');
  expect(
    h.renderRandomValue({
      oneOf: [{$ref: '#/definitions/Bar'}, {value: 5}],
    }),
  ).toBe('sample([t.mockBar(), 5]) as t.Bar | 5');

  // `enum`
  expect(
    h.renderRandomValue({
      title: 'Foo',
      enum: ['Bar', 'Baz'],
    }),
  ).toBe('sample([t.Foo.Bar, t.Foo.Baz]) as t.Foo');

  // `type`
  expect(h.renderRandomValue({type: 'string'})).toBe('rand.str()');
  expect(h.renderRandomValue({type: 'integer'})).toBe('rand.int()');
  expect(h.renderRandomValue({type: 'number'})).toBe('rand.num()');
  expect(h.renderRandomValue({type: 'object'})).toBe(`{}`); // TODO values
  expect(h.renderRandomValue({type: 'null'})).toBe('null');
  expect(h.renderRandomValue({type: 'boolean'})).toBe(
    'sample([true, false]) as boolean',
  );
  expect(h.renderRandomValue({type: 'array'})).toBe(`[]`); // TODO values
});

it(`renders an object property key/value pair`, () => {
  expect(
    h.renderPropertyPairNameToValue({$ref: '#/definitions/Foo'}, 'foo', {}),
  ).toBe(`foo: t.mockFoo()`);
});

it(`renders an object property key/type pair`, () => {
  expect(
    h.renderPropertyPairNameToType({$ref: '#/definitions/Foo'}, 'foo', {}),
  ).toBe(`foo?: t.Foo`);
});

it(`renders a property when it is an arg to a function`, () => {
  expect(h.renderCallingArgs({$ref: '#/definitions/Foo'}, 'foo', {})).toBe(
    `t.mockFoo()`,
  );
});

it(`renders a property list`, () => {
  expect(h.renderPropList({value: 5})).toBe('');
  expect(
    h.renderPropList({
      properties: {foo: {value: 5}, bar: {$ref: '#/definitions/Bar'}},
    }),
  ).toBe(`foo: 5, bar: t.mockBar()`);
});

it(`infers a definition's type declaration kind`, () => {
  expect(
    h.inferTypeDeclarationKind({title: 'Foo', type: 'number', value: 5}),
  ).toBe(h.TypeDeclarationKind.TypeLiteral);
  expect(
    h.inferTypeDeclarationKind({
      title: 'Foo',
      oneOf: [{$ref: '#/definitions/Bar'}, {$ref: '#/definitions/Baz'}],
    }),
  ).toBe(h.TypeDeclarationKind.TypeLiteral);
  expect(
    h.inferTypeDeclarationKind({
      title: 'Foo',
      enum: ['Bar', 'Baz'],
    }),
  ).toBe(h.TypeDeclarationKind.Enum);
  expect(
    h.inferTypeDeclarationKind({
      title: 'Foo',
      $ref: '#/definitions/Foo',
    }),
  ).toBe(h.TypeDeclarationKind.Interface);
});

it(`renders a definition's type declaration`, () => {
  expect(
    h.renderTypeDeclaration({title: 'Foo', type: 'number', value: 5}),
  ).toBe('export type Foo = 5;');
  expect(
    h.renderTypeDeclaration({title: 'Foo', type: 'string', value: 'foo'}),
  ).toBe('export type Foo = "foo";'); // double quotes because we're using `JSON.stringify` as a shortcut
  expect(
    h.renderTypeDeclaration({title: 'Foo', type: 'boolean', value: true}),
  ).toBe('export type Foo = true;');
  expect(
    h.renderTypeDeclaration({
      title: 'Foo',
      oneOf: [{$ref: '#/definitions/Bar'}, {$ref: '#/definitions/Baz'}],
    }),
  ).toBe('export type Foo = Bar | Baz;');
  expect(
    h.renderTypeDeclaration({
      title: 'Foo',
      enum: ['Bar', 'Baz'],
    }),
  ).toBe('export enum Foo { Bar, Baz };');
  expect(
    h.renderTypeDeclaration({
      title: 'Foo',
      properties: {
        bar: {value: 5},
        baz: {value: 7},
      },
      required: ['bar'],
    }),
  ).toBe('export interface Foo { bar: 5; baz?: 7 }');
});

it(`renders a definiton as an action creator call`, () => {
  expect(
    h.renderActionCreatorCall({
      title: 'FooAction',
      properties: {payload: {}},
    }),
  ).toBe('t.foo()');
  expect(
    h.renderActionCreatorCall({
      title: 'FooAction',
      properties: {
        payload: {
          type: 'object',
          properties: {bar: {value: 5}, baz: {value: 7}},
        },
      },
    }),
  ).toBe('t.foo(5, 7)');
});

it(`renders the properties of an object literal`, () => {
  expect(
    h.renderPropertiesObjectLiteral({
      type: 'string',
      value: 'hi',
    }),
  ).toBe('null');
  expect(
    h.renderPropertiesObjectLiteral({
      type: 'object',
      properties: {
        foo: {type: 'number', value: 5},
        bar: {type: 'number', value: 7},
      },
    }),
  ).toBe('{ foo, bar }');
});

it(`renders a definition's action creator name`, () => {
  expect(h.renderActionCreatorName({title: 'FooAction'})).toBe('foo');
});

it(`renders a definition's action type value`, () => {
  expect(h.renderActionTypeValue({title: 'Foo'})).toBe('t.Foo');
});
