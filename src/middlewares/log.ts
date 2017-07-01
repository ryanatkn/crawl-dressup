import {Middleware} from 'redux';

import * as t from '../types';
import {logger} from '../utils/logger';

const log = logger('middleware', {count: ['action', 'state']});

// TODO could create messages that cause side effects, as well as state transofmrations
export const logMiddleware: Middleware = (store: t.Store) => (
  next: Function,
) => (action: t.Action) => {
  log('action', store, `${t.ActionType[action.type]}`, action.payload);
  const result = next(action);
  // log(`state`, store, store.getState()); // TODO perf considerations
  return result;
};
