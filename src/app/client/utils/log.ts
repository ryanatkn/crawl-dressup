/*

A fancy logger for the browser. Too fancy. It's complicated, needs fixing. TODO fixme

*/

export type LogTag = string;

export interface LoggerOptions {
  count?: Array<LogTag> | undefined;
}

export type LoggerCtx = object;

// The global `cache` stores meta data, like log counters, for any arbitrary context object.
// This allows multiple loggers to share context meta data state.
const cache = new WeakMap<LoggerCtx, LoggerOptions>();

// The `logger` tracks and enhances log messages with meta data like counters.
export const logger = (
  moduleName: string,
  options: LoggerOptions = {count: undefined},
) => {
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'test'
  ) {
    return Function.prototype; // the rest of this fn gets stripped in prod
  }
  return (
    tag: string,
    ctx?: LoggerCtx | undefined, // providing a ctx tracks the number of times each `tag` is rendered for that object instance (stored in a weakmap so no memory leak concerns)
    ...args: Array<any>
  ): void => {
    let meta = '';
    let val;

    // Handle the `count` option, allowing a declarative way to automatically
    // count the number of times each tag is logged for a given object instance
    if (ctx && options.count && options.count.includes(tag)) {
      // Increment and log a counter for the tags specified in `options`
      val = cache.get(ctx);
      if (!val) {
        val = {[tag]: {count: 0}}; // TODO reducers?
        // console.log('creating log ctx data', tag, val);
        cache.set(ctx, val);
      }
      if (!val[tag]) {
        // console.log('creating log ctx data for tag', tag, val);
        val[tag] = {count: 0};
      }
      val[tag].count++;
      meta += val[tag].count;
      meta += ' ';
    }

    // colorize in the browser differently than node
    let msg: string;
    // tslint:disable-next-line:strict-type-predicates
    if (typeof document !== 'undefined') {
      // browser
      // TODO better browser detection?
      msg = `%c[${moduleName}] ${meta}%c[${tag}]`;
      const [arg0] = args;
      args.unshift('color: #c73;');
      args.unshift('color: #999;');
      // doing some acrobatics to get colors to log in chrome just the right way - TODO get a lib lol
      // remove the string, because we need to add it to the beginning string to color it
      // - not sure if I'm misunderstanding the api, but yeah this is bad
      if (typeof arg0 === 'string') {
        args.splice(2, 1, 'color: #48c;');
        msg += ` %c[${arg0}]`;
      }
    } else {
      // node
      msg = `[${moduleName}] ${meta}[${tag}]`;
    }
    args.unshift(msg);
    console.log.apply(console, args);
  };
};
