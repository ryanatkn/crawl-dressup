import {ServerCtx} from './types';
import {logger} from './utils/log';
import {main} from './main';

const log = logger('server/index');

main()
  .then((ctx: ServerCtx) => {
    log('created ctx', Object.keys(ctx));
  })
  .catch(err => {
    log('err', err, err.stack);
    throw err;
  });
