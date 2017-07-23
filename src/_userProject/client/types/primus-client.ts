/* tslint:disable:max-line-length no-unused-variable */

/**
 * Primus has no officially supported types.
 * Using ambient declarations on the client because Primus attaches to the global.
 */
type UntypedPrimusClientEvent =
  | 'reconnect scheduled' // public    client         We're scheduling a reconnect.
  | 'reconnect' // public    client         Reconnect attempt is about to be made.
  | 'reconnected' // public    client         Successfully reconnected.
  | 'reconnect timeout' // public    client         Reconnect attempt took too much time.
  | 'reconnect failed' // public    client         Failed to reconnect.
  | 'timeout' // public    client         Failed to connect to server.
  | 'open' // public    client         Connection is open.
  | 'destroy' // public    client         The instance has been destroyed.
  | 'error' // public    client/spark   An error happened.
  // | 'data'                 // public    client/spark   We received data.
  | 'end' // public    client/spark   The connection has ended.
  | 'close' // public    client/server  The connection has closed, we might reconnect. / The server has been destroyed.
  | 'online' // public    client         We've regained a network connection.
  | 'offline' // public    client         We've lost our internet connection.
  | 'readyStateChange'; // public    client/spark   The readyState has changed.

declare class Primus<M> {
  constructor(url: string, opts: any);
  // write(message: M): void; // Monkey patch in some meta data. Custom primus type enforces `writeMessage` over `write`.
  writeMessage(message: M): void;
  on(event: 'data', cb: (message: M) => void): void;
  on(event: UntypedPrimusClientEvent, cb: Function): void;
}

interface Window {
  Primus: typeof Primus;
}
