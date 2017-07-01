declare module 'fs'; // eh?
declare module 'path'; // why?
declare module 'prettier';
declare module 'strip-json-comments'; // has @types, but getting an error: Module '"C:/Users/ryann/Desktop/dev/dbslate/node_modules/@types/strip-json-comments/index"' resolves to a non-module entity and cannot be imported using this construct. (2497)
declare module 'es6-promisify';

interface Dict<T> {
  [key: string]: T;
}

interface Nict<T> {
  [key: number]: T;
}

interface CtorOf<T> {
  new (...args: any[]): T;
}

// Need to extend some globals for Monaco,
// since it's outside our normal build process.
interface Window {
  require: Function;
  monaco: {
    editor: MonacoEditor;
  };
}

// TODO import Monaco's types?
interface MonacoEditor {
  create(el: HTMLElement, opts: MonacoEditorOptions): MonacoEditor;
  layout(): void;
  setValue(v: string): void;
  onDidChangeModelContent(f: Function): void;
  getModel(): any;
  destroy(): void;
}

interface MonacoEditorOptions {
  value: string;
  language: string;
}
