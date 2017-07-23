import * as promisify from 'es6-promisify';

import {ServerCtx} from '../types';
import {initApp} from './initApp';
import {initPrimus} from './initPrimus';
import {initSessionStore} from './initSessionStore';
import {logger} from '../utils/log';

const log = logger('init');

export async function main(): Promise<ServerCtx> {
  log('main enter');

  // TODO create with helper, don't cast type
  const appCtx: ServerCtx = {
    config: {port: 8999, secret: 'TODOfixme'}, // TODO env vars, proper config
    app: undefined,
    router: undefined,
    primus: undefined,
  } as any;

  // Set up the appCtx, an object that has all of the app's references to stateful stuff.
  // Initializers mutate the `appCtx` to set it up,
  // and can store references to it to access app-wide state for post-initialization behaviors.
  const initializers = [initSessionStore, initApp, initPrimus];
  for (const initializer of initializers) {
    await initializer(appCtx);
  }

  const listen = promisify(appCtx.server.listen, appCtx.server);
  await listen(appCtx.config.port);
  log(`listening on port ${appCtx.config.port}`);

  log('main exit');
  return appCtx;
}
