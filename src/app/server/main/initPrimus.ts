import * as Primus from 'primus';
import * as chalk from 'chalk';
import * as t from '../../client/types';

import {reloadSession, sessionMiddleware} from '../middleware/session';

import {ExpressSession} from '../types';
import {ServerCtx} from '../types';
import {cookieMiddleware} from '../middleware/cookie';
import {handleMessage} from './handleMessage';
import {logger} from '../utils/log';

const log = logger('Primus');

export async function initPrimus(appCtx: ServerCtx): Promise<void> {
  // Create the Primus websocket server
  if (!appCtx.server) {
    throw Error(`Expected appCtx.server to be created before Primus`);
  }
  if (!appCtx.sessionStore) {
    throw Error(`Expected appCtx.sessionStore to be created before Primus`);
  }

  const primus = new Primus<t.Message, ExpressSession>(appCtx.server, {
    transformer: 'sockjs', // TODO 'uws'
  });
  appCtx.primus = primus;

  // Monkey patch in some meta data. Custom primus type enforces `writeMessage` over `write`.
  primus.writeMessage = (message: t.Message): void => {
    // const finalMessage = initMessage(message, authorId);
    log('writing action', message);
    (primus as any).write(message);
  };

  primus.use('cookies', cookieMiddleware(appCtx.config.secret));
  primus.use(
    'session',
    sessionMiddleware(appCtx.config.secret, appCtx.sessionStore),
  );
  primus.use('log', (req: any, _res: any) => {
    log('middleware req.session.userId', chalk.bgCyan(req.session.userId));
    log('middleware req.sessionID', chalk.bgYellow(req.sessionID));
  });

  primus.on('connection', spark => {
    log('connection', spark.id, spark.address, spark.request.session);

    // Monkey patch in some meta data. Custom primus type enforces `writeMessage` over `write`.
    spark.writeMessage = async (message: t.Message): Promise<void> => {
      if (spark.request.session) {
        await reloadSession(spark.request.session); // TODO hmm is this necessary?
      }
      // initMessage(message) // TODO? validate?
      (spark as any).write(message);
    };

    spark.on('data', async (data: any, ...args: any[]) => {
      log('data', data, args);
      if (!spark.request.session) {
        throw new Error('Expected session');
      }
      await reloadSession(spark.request.session);
      const userId = spark.request.session.userId;
      log('on data session.userId', chalk.bgCyan(userId || ''));
      log('on data req.sessionID', chalk.bgYellow(spark.request.sessionID));
      try {
        await handleMessage(appCtx, spark, data);
      } catch (err) {
        log(
          chalk.white(chalk.bgRed(`Error handling action: ${err.message}\n`)),
          chalk.red(err.stack),
        );
      }
    });
  });

  primus.on('disconnection', spark => {
    log('disconnection', spark.id, spark.address);
  });

  // Wait for Primus to initialize itself
  await new Promise<void>(resolve => {
    primus.on('initialised', () => {
      log('initialized');
      resolve();
    });
  });
}
