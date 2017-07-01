import * as React from 'react';

import * as t from '../types';
import {logger} from '../utils/logger';

import {TextEditor} from './TextEditor';

const dbg = logger('QueryEditor', {count: ['render']});

export interface Props extends React.ClassAttributes<any> {
  query: t.Query;
  sources: t.DataSource[];
  updateTitle(id: string, title: string): void;
  updateRaw(id: string, raw: string): void;
  updateSourceId(id: string, sourceId: string): void;
}

export class QueryEditor extends React.Component<Props> {
  render(): JSX.Element {
    dbg('render', this);
    const {query, sources} = this.props;
    return (
      <div className="QueryEditor">
        <div>
          <select value={query.sourceId} onChange={this.doChangeSourceId}>
            {sources.map(s => <option key={s.id} value={s.id}>{s.uri}</option>)}
          </select>
        </div>
        <div>
          <h3>
            <input
              type="text"
              value={query.title}
              onChange={this.doChangeTitle}
              placeholder="query title"
            />
          </h3>
        </div>
        <div style={{height: 400}}>
          <TextEditor
            text={query.raw}
            onChange={this.doTextEditorChange}
            ref={this.assignTextEditorRef}
          />
        </div>
      </div>
    );
  }

  doChangeSourceId = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    this.props.updateSourceId(this.props.query.id, e.target.value);
  };

  doChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateTitle(this.props.query.id, e.target.value);
  };

  textEditorRef: TextEditor;
  assignTextEditorRef = (r: TextEditor) => (this.textEditorRef = r);

  doTextEditorChange = (text: string): void => {
    // the editor's `onChange` gets fired when we set a new value,
    // so check that it doesn't already match what's in the store
    // or it'll perform a redundant action/render
    if (this.props.query.raw !== text) {
      this.props.updateRaw(this.props.query.id, text);
    }
  };
}
