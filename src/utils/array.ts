export const fillArray = <T>(
  count: number,
  getNextItem: (...t: Array<any>) => T,
  getArgs?: (i: number) => Array<any>,
): T[] => {
  const arr = new Array(count);
  for (let i = 0; i < count; i++) {
    arr[i] = getArgs ? getNextItem(...getArgs(i)) : getNextItem();
  }
  return arr;
};
