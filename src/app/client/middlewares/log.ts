import * as t from '../types';

import {MiddlewareAPI} from 'redux';
import {logger} from '../utils/log';

const log = logger('middleware', {count: ['action', 'state']});

// TODO could create messages that cause side effects, as well as state transofmrations
export const logMiddleware = (api: MiddlewareAPI<t.ClientState>) => (
  next: Function,
) => (action: t.Action) => {
  log('action', api, `${t.ActionType[action.type]}`, action.payload);
  const result = next(action);
  // log(`state`, api, api.getState()); // TODO perf considerations
  return result;
};
