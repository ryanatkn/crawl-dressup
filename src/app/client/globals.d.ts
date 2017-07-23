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
