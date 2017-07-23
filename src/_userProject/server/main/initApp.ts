import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as http from 'http';

import {ServerCtx} from '../types';
import {logger} from '../utils/log';

// import * as serve from 'koa-static';

const log = logger('app');

export async function initApp(appCtx: ServerCtx): Promise<void> {
  const app = new Koa();
  const server = http.createServer(app.callback());
  const router = createAppRouter();
  appCtx.app = app;
  appCtx.server = server;
  appCtx.router = router;

  app.use(async (ctx, next) => {
    log('enter');
    await next();
    log('exit');
  });
  app
    // .use(serve(rootPath)) // TODO is this needed?
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());
}

export function createAppRouter(): Router {
  const router = new Router();

  router.post('/echo', async (ctx: any, next: () => Promise<any>) => {
    log('echo', ctx.request.body);
    await next();
    ctx.body = ctx.request.body;
    ctx.status = 200;
  });

  return router;
}
