interface Dict<T> {
  [key: string]: T;
}

interface NumDict<T> {
  [key: number]: T;
}

interface CtorOf<T> {
  new (...args: any[]): T;
}
