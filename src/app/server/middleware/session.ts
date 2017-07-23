import * as chalk from 'chalk';
import * as expressSession from 'express-session';

import {ExpressMiddleware, ExpressSession, ExpressSessionStore} from '../types';

import {logger} from '../utils/log';

const log = logger('session');

let middleware: ExpressMiddleware;

export function sessionMiddleware(
  secret: string,
  sessionStore: ExpressSessionStore,
): ExpressMiddleware {
  return (
    middleware ||
    (middleware = expressSession({
      secret,
      store: sessionStore,
      proxy: process.env.NODE_ENV === 'production',
      rolling: true,
      resave: false,
      saveUninitialized: true, // false
      // cookie: {
      //   httpOnly: true,
      //   maxAge: 1000 * 60 * 60 * 24 * 365,
      //   secure: process.env.NODE_ENV === 'production',
      //   domain: process.env.NODE_ENV === 'production' ? 'foo.mmo' : undefined,
      // },
    }))
  );
}

export async function reloadSession(session: ExpressSession): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!session || !session.reload) {
      resolve();
      return;
    }
    session.reload(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function saveSession(session: ExpressSession): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!session || !session.save) {
      resolve();
      return;
    }
    session.save(err => {
      if (err) {
        log(chalk.bgRed('failed to save session'), err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export async function updateSessionUserId(
  session: ExpressSession,
  userId: string | undefined,
): Promise<void> {
  session.userId = userId;
  await saveSession(session);
}
