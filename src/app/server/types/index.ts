import * as Koa from 'koa';
import * as Primus from 'primus';
import * as Router from 'koa-router';
import * as expressSession from 'express-session';
import * as http from 'http';

import {Message} from '../../client/types';

export interface ServerConfig {
  port: number;
  secret: string;
}

export interface ServerCtx {
  config: ServerConfig;
  server: http.Server;
  app: Koa;
  router: Router;
  primus: Primus<Message, ExpressSession>;
  sessionStore: ExpressSessionStore;
}

export type ExpressSessionStore =
  | expressSession.Store
  | expressSession.MemoryStore;

// Koa is used for the http server, but Primus uses Express sessions right now.
export interface ExpressSession extends Express.Session {
  userId: string | undefined;
  user: object | undefined;
}

export type ExpressMiddleware = (
  req: Express.Request,
  res: Express.Response,
  next: Function,
) => void;

export type PrimusSpark = Primus.Spark<Message, ExpressSession>;
