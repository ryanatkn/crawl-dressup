import * as t from '../types';

import {handleMessage} from './handleMessage';
import {logger} from '../utils/log';

const log = logger('primus');

const config = {
  serverUrl: 'http://localhost:8999',
};

if (!window.Primus) {
  log(
    `Primus could not be loaded from "${config.serverUrl}/primus/primus.js".` +
      ` Is the server running? npm run server`,
  );
}

export const createPrimus = (): t.PrimusClient => {
  const primus = new Primus<t.Message>(config.serverUrl, {}); // TODO the type annotation here is causing an error in the build but not editor
  return primus;
};

export const initPrimus = async (ctx: t.ClientCtx): Promise<void> => {
  const {primus, store} = ctx;

  // Monkey patch in some meta data. Custom primus type enforces `writeMessage` over `write`.
  primus.writeMessage = (message: t.Message): void => {
    // const finalMessage = validateMessage(message);
    log('writing message', message);
    (primus as any).write(message);
  };

  // Listen to primus events
  primus.on('data', async data => {
    try {
      log('data', data);
      await handleMessage(store, data);
    } catch (err) {
      log('error handling message', err, data);
    }
  });
  primus.on('open', () => {
    log('on:open', 'Connection is alive and kicking');
  });
  primus.on('error', (err: any) => {
    log('on:error', 'Something horrible has happened', err.stack);
  });
  primus.on('reconnect', (opts: any) => {
    log('on:reconnect', 'Reconnection attempt started', opts);
  });
  primus.on('reconnect scheduled', (opts: any) => {
    log(
      'on:reconnect scheduled',
      `Reconnecting in ${opts.scheduled} ms, attempt ${opts.attempt} out of ${opts.retries}`,
    );
  });
  primus.on('reconnected', (opts: any) => {
    log('on:reconnected', `It took ${opts.duration} ms to reconnect`);
  });
  primus.on('reconnect timeout', (err: any, opts: any) => {
    log('on:reconnect timeout', 'Timeout expired', err, opts);
  });
  primus.on('reconnect failed', (err: any, opts: any) => {
    log('on:reconnect failed', 'Reconnection failed', err, opts);
  });
  primus.on('end', () => {
    log('on:end', 'Connection closed');
  });

  // Send a test message
  primus.writeMessage({type: t.MessageType.InitMessage, payload: null});
};
