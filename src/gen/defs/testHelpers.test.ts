import {createTestClay} from './testHelpers';

it('creates a clay object for testing with some standardized defs', () => {
  const clay = createTestClay();
  expect(clay.definitions.Foo).toBeTruthy();
  expect(clay.definitions.Bar).toBeTruthy();
});

it('extends the test clay object with arbitrary definitions', () => {
  const partial = {definitions: {TestDef: {title: 'TestDef'}}};
  const clay = createTestClay(partial);
  expect(clay.definitions.TestDef).toEqual(partial.definitions.TestDef);
});
