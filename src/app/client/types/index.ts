export * from '../../../utils/is';
export * from '../../types';
export * from '../actions/app.actions.gen';

import * as t from '../types';

import {Dispatch as ReduxDispatch, Store as ReduxStore} from 'redux';

export interface ClientCtx {
  root: HTMLElement | null;
  store: Store;
  primus: Primus<t.Message>;
}

export type Store = ReduxStore<t.ClientState>;
export type Dispatch = ReduxDispatch<t.ClientState>;

export interface PrimusClient extends Primus<t.Message> {}
