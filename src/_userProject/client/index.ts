import {ClientCtx} from './types';
import {logger} from './utils/log';
import {main} from './main';

const log = logger('client/index');

main()
  .then((ctx: ClientCtx) => {
    log('created client ctx', Object.keys(ctx));

    // set some convenient globals
    Object.assign(window, {ctx, store: ctx.store, st: ctx.store.getState});
  })
  .catch(err => {
    log('err', err, err.stack);
    throw err;
  });
