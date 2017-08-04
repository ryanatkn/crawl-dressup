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

export const sortItems = <T>(orderedItems: T[]) => (a: T, b: T) => {
  const aIdx = orderedItems.indexOf(a);
  const bIdx = orderedItems.indexOf(b);
  if (aIdx === -1 && bIdx === -1) {
    return aIdx < bIdx ? -1 : 1;
  } else if (aIdx === -1) {
    return 1;
  } else if (bIdx === -1) {
    return -1;
  } else if (aIdx < bIdx) {
    return -1;
  } else {
    return 1;
  }
};
