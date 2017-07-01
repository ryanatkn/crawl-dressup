import * as React from 'react';

import * as t from '../types';
import {logger} from '../utils/logger';

const dbg = logger('QueryResults', {count: ['render']});

export interface Props extends React.ClassAttributes<any> {
  query: t.Query;
  executeQuery(id: string): void;
  deleteQuery(id: string): void;
}

export const renderQueryResults = (query: t.Query): JSX.Element | null => {
  switch (query.status) {
    case 'new':
      return null;
    case 'pending':
      return (
        <pre>
          {query.lastExecuted} ={' '}
          <em>[loading...]</em>
        </pre>
      );
    case 'failed':
      return (
        <pre>
          {query.lastExecuted} ={' '}
          <strong>error</strong>: {query.error}
        </pre>
      );
    case 'resolved':
      return (
        <pre>
          {query.lastExecuted} ={' '}
          {JSON.stringify(query.results, null, 2)}
        </pre>
      );
    default:
      t.is<never>(query);
      return null;
  }
};

export class QueryResults extends React.Component<Props> {
  render(): JSX.Element | null {
    dbg('render', QueryResults);
    const {query} = this.props;
    return (
      <div className="QueryResults">
        <div>
          <div>
            <button
              onClick={this.doExecuteQuery}
              disabled={query.lastExecuted === query.raw}
            >
              execute
            </button>
            <button
              onClick={this.doExecuteQuery}
              disabled={query.lastExecuted !== query.raw}
            >
              ↻
            </button>
            <button onClick={this.doDeleteQuery}>✕</button>
          </div>
        </div>
        <div>
          {renderQueryResults(query)}
        </div>
      </div>
    );
  }

  doExecuteQuery = () => {
    this.props.executeQuery(this.props.query.id);
  };

  doDeleteQuery = () => {
    this.props.deleteQuery(this.props.query.id);
  };
}
