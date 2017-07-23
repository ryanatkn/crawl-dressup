import {MemoryStore} from 'express-session';
import {ServerCtx} from '../types';

export async function initSessionStore(appCtx: ServerCtx): Promise<void> {
  if (appCtx.sessionStore) {
    throw new Error('appCtx already has a sessionStore');
  }
  const sessionStore = new MemoryStore(); // TODO new RedisStore({client: appCtx.redis}))
  appCtx.sessionStore = sessionStore;
}
