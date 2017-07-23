/* tslint:disable:max-line-length no-unused-variable no-internal-module no-namespace */

declare module 'primus' {
  import * as http from 'http';

  namespace Primus {
    type UntypedPrimusSparkEvent =
      | 'error' // public    client/spark   An error happened.
      // | 'data'                 // public    client/spark   We received data.
      | 'end' // public    client/spark   The connection has ended.
      | 'heartbeat' // public    spark          We've received a heartbeat and have reset the timer.
      | 'readyStateChange'; // public    client/spark   The readyState has changed.

    interface Spark<M extends {}, S extends Express.Session> {
      id: string;
      address: {ip: string; secure: boolean; port: number};
      // write(message: P): void; // Monkey patch in some meta data. Custom primus type enforces `writeMessage` over `write`.
      writeMessage(message: M): Promise<void>;
      on(event: 'data', cb: (message: M) => void): void;
      on(event: UntypedPrimusSparkEvent, cb: Function): void;
      request: {
        session: S | undefined;
        sessionID: string;
      };
    }

    type UntypedPrimusServerEvent =
      | 'close' // public    client/server  The connection has closed, we might reconnect. / The server has been destroyed.
      // | 'connection'           // public    server         We received a new connection.
      // | 'disconnection'        // public    server         We received a disconnection.
      | 'initialised' // public    server         The server is initialised.
      | 'plugin' // public    server         A new plugin has been added.
      | 'plugout' // public    server         A plugin has been removed.
      | 'log'; // public    server         Log messages.

    type Middleware = SyncMiddleware | AsyncMiddleware;
    type SyncMiddleware = (req: any, res: any) => void; // TODO type
    type AsyncMiddleware = (req: any, res: any, next: Function) => void; // TODO type
  }

  class Primus<M extends {}, S extends Express.Session> {
    constructor(server: http.Server, opts: any);
    // write(message: P): void; // Monkey patch in some meta data. Custom primus type enforces `writeMessage` over `write`.
    writeMessage(message: M): void;
    on(
      event: 'connection' | 'disconnection',
      cb: (spark: Primus.Spark<M, S>) => void,
    ): void;
    on(event: Primus.UntypedPrimusServerEvent, cb: Function): void;
    library(): string;
    use(
      name: string,
      middleware: (() => Primus.Middleware) | Primus.Middleware,
    ): void;
  }

  export = Primus;
}
