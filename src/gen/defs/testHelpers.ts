import * as h from './helpers';

import {Clay} from './types';

export const createTestClay = (partial?: Partial<Clay>): Clay => {
  const clay: Clay = {
    type: 'object',
    id: 'testId',
    name: 'TestApp',
    title: 'TestApp',
    description: 'clay for tests',
    definitions: {
      Foo: {title: 'Foo'},
      Bar: {title: 'Bar'},
      Action: {
        title: 'Action',
        anyOf: [
          {$ref: '#/definitions/FooAction'},
          {$ref: '#/definitions/BarAction'},
        ],
      },
      FooAction: {
        title: 'FooAction',
      },
      BarAction: {
        title: 'BarAction',
      },
    },
    properties: {},
  };
  return h.mergeClayPartial(clay, partial);
};
