// Simple logger that should work in any env (not preferred for any of them, though)
export const logger = (tag: string) => (...args: any[]): void => {
  if (process.env.NODE_ENV === 'test') return;
  args.unshift(`[${tag}]`);
  console.log.apply(console, args);
};
