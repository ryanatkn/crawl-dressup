import * as React from 'react';

import {logger} from '../utils/log';

const log = logger('TextEditor', {count: ['render']});

// Monaco uses its own module system
const LOADER_SCRIPT_ID = 'monaco-loader-script';
const loadMonacoLoader = (onLoad: () => void): void => {
  const existingScriptEl = document.getElementById(LOADER_SCRIPT_ID);
  if (existingScriptEl) {
    // TODO possible bug - does the 'load' event fire if already loaded in every browser? kinda doubtful
    // if (window.require) {
    //   onLoad();
    // else {
    existingScriptEl.addEventListener('load', onLoad);
    return;
  }

  const scriptEl = document.createElement('script');
  scriptEl.addEventListener('load', onLoad);
  scriptEl.id = LOADER_SCRIPT_ID;
  scriptEl.type = 'text/javascript';
  scriptEl.src = 'vs/loader.js';
  document.body.appendChild(scriptEl);
};

export interface Props {
  text: string;
  onChange(text: string): void;
}

export class TextEditor extends React.PureComponent<Props> {
  componentDidMount(): void {
    this.loadMonaco();
  }

  componentWillUnMount(): void {
    this.destroyMonaco();
  }

  lastText = '';
  editor: MonacoEditor | undefined;
  editorRef: HTMLElement | undefined;

  componentWillReceiveProps(nextProps: Props): void {
    // need to keep the editor synced
    if (!this.editor) {
      log('editor has not yet been created');
    } else if (nextProps.text !== this.lastText) {
      // can't use this.props.text because of ..event handling order? something
      // TODO feels hacky, instead of this.. hmm..could set a dirty flag
      // picked up in componentDidUpdate? not sure if that improves anything.
      log('value changed from external source, updating editor');
      this.lastText = nextProps.text;
      this.editor.setValue(nextProps.text);
    } else {
      log('value did not change, not updating editor');
    }
  }

  render(): JSX.Element {
    log('render', this);
    const height = '100%'; // window.innerHeight * 0.75;
    return (
      <div className="TextEditor" style={{height}}>
        <div ref={this.doAssignEditorRef} style={{height}} />
      </div>
    );
  }

  doAssignEditorRef = (r: HTMLDivElement) => (this.editorRef = r);

  loadMonaco(): void {
    loadMonacoLoader(() => {
      // load monaco
      window.require(['vs/editor/editor.main'], () => {
        this.initMonaco();
      });
    });
  }

  // Will be called once monaco library is available
  initMonaco(): void {
    if (!this.editorRef) {
      throw Error(`Unable to init Monaco - missing editorRef`);
    }
    const editor = (this.editor = window.monaco.editor.create(this.editorRef, {
      value: this.props.text,
      language: 'sql',
    }));
    (window as any).editor = editor;
    this.editor.onDidChangeModelContent((change: any) => {
      // TODO type?
      const text = editor.getModel().getValue(); // TODO do this more efficiently?
      this.lastText = text;
      this.props.onChange(text);
      log('changed monaco content', this.editor, change);
    });
    log('created monaco editor', this.editor);
  }

  destroyMonaco(): void {
    log('destroying monaco editor', this.editor);
    if (!this.editor) return;
    this.editor.destroy();
    this.editor = undefined;
    this.editorRef = undefined;
  }

  updateLayout(): void {
    if (this.editor) {
      this.editor.layout();
    }
  }
}
