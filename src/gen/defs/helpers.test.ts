import * as h from './helpers';

import {Clay} from './types';
import {createTestClay} from './testHelpers';

it('extracts a type title from a $ref', () => {
  expect(h.extractRefTypeTitle('#/definitions/Foo')).toBe('Foo');
});

it('merges a partial clay definition with a complete one', () => {
  const clay = createTestClay();
  const partial: Partial<Clay> = {
    definitions: {
      TestMerge: {title: 'TestMerge', type: 'number', value: 5},
      Foo: {title: 'Foo', type: 'string', value: 'str'},
    },
  };
  h.mergeClayPartial(clay, partial);
  // Add new definition
  expect(clay.definitions.TestMerge).toBe(
    partial.definitions && partial.definitions.TestMerge,
  );
  // Overwrite existing definitions
  expect(clay.definitions.Foo).toBe(
    partial.definitions && partial.definitions.Foo,
  );
  // Preserve unaltered definitions
  expect(clay.definitions.Bar).toBeTruthy();
});

it('looks up a definition by $ref', () => {
  const clay = createTestClay();
  const def = h.lookupDef(clay, '#/definitions/Foo');
  expect(def).toBe(clay.definitions.Foo);
});

it('gets simple super defs for a def', () => {
  const clay = createTestClay({
    definitions: {
      TestSubDef: {
        title: 'TestSubDef',
        allOf: [{$ref: '#/definitions/Foo'}, {$ref: '#/definitions/Bar'}],
      },
    },
  });
  const superDefs = h.getSuperDefs(clay, clay.definitions.TestSubDef);
  expect(superDefs).toEqual([
    clay.definitions.Foo,
    clay.definitions.Bar,
    clay.definitions.TestSubDef,
  ]);
});

it('gets a chain of super defs for a def', () => {
  const clay = createTestClay({
    definitions: {
      Foo1: {title: 'Foo1', allOf: [{$ref: '#/definitions/Foo2'}]},
      Foo2: {title: 'Foo2', allOf: [{$ref: '#/definitions/Foo3'}]},
      Foo3: {title: 'Foo3'},
      TestSubDef: {
        title: 'TestSubDef',
        allOf: [{$ref: '#/definitions/Foo1'}, {$ref: '#/definitions/Bar'}],
      },
    },
  });
  const superDefs = h.getSuperDefs(clay, clay.definitions.TestSubDef);
  expect(superDefs).toEqual([
    clay.definitions.Foo3,
    clay.definitions.Foo2,
    clay.definitions.Foo1,
    clay.definitions.Bar,
    clay.definitions.TestSubDef,
  ]);
});

it('gets a complex chain of super defs for a def', () => {
  const clay = createTestClay({
    definitions: {
      Foo1: {
        title: 'Foo1',
        allOf: [
          {$ref: '#/definitions/Foo2a'},
          {$ref: '#/definitions/Foo2b'},
          {$ref: '#/definitions/Foo2c'},
        ],
      },
      Foo2a: {
        title: 'Foo2a',
        allOf: [{$ref: '#/definitions/Foo3'}, {$ref: '#/definitions/Foo3a'}],
      },
      Foo2b: {
        title: 'Foo2b',
        allOf: [{$ref: '#/definitions/Foo3'}, {$ref: '#/definitions/Foo3b'}],
      },
      Foo2c: {
        title: 'Foo2c',
        allOf: [{$ref: '#/definitions/Foo3'}, {$ref: '#/definitions/Foo3c'}],
      },
      Foo3: {title: 'Foo3'},
      Foo3a: {title: 'Foo3a'},
      Foo3b: {title: 'Foo3b'},
      Foo3c: {title: 'Foo3c'},
      TestSubDef: {
        title: 'TestSubDef',
        allOf: [{$ref: '#/definitions/Foo1'}, {$ref: '#/definitions/Bar'}],
      },
    },
  });
  const superDefs = h.getSuperDefs(clay, clay.definitions.TestSubDef);
  // depth-first order
  expect(superDefs).toEqual([
    clay.definitions.Foo3,
    clay.definitions.Foo3a,
    clay.definitions.Foo2a,
    clay.definitions.Foo3b,
    clay.definitions.Foo2b,
    clay.definitions.Foo3c,
    clay.definitions.Foo2c,
    clay.definitions.Foo1,
    clay.definitions.Bar,
    clay.definitions.TestSubDef,
  ]);
});
