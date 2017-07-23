// Simple logger - TODO properly (winston?)
export const logger = (tag: string) => (...args: any[]): void => {
  if (process.env.NODE_ENV === 'test') return;
  args.unshift(`[${tag}]`);
  console.log.apply(console, args);
};
