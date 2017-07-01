import * as React from 'react';

import * as t from '../types';
import {logger} from '../utils/logger';

const dbg = logger('QueryListItem', {count: ['render']});

export interface Props extends React.ClassAttributes<any> {
  query: t.Query;
  activeQuery: t.Query | undefined;
  setActiveQuery(id: string): void;
}

export const renderTruncatedResults = (
  query: t.Query,
): JSX.Element | string | null => {
  switch (query.status) {
    case 'new':
    case 'pending':
      return null;
    case 'failed':
      return `[error: ${query.error}]`;
    case 'resolved':
      // Display truncated results, if available
      let resultsStr = JSON.stringify(query.results, null, 2) || '';
      const resultsLines = resultsStr.split('\n');
      if (resultsLines.length > 4) {
        resultsStr = `${resultsLines.slice(0, 4).join('\n')}\n...}`;
      }
      return resultsStr;
    default:
      t.is<never>(query);
      return null;
  }
};

export const renderTruncatedRawQuery = (
  query: t.Query,
): JSX.Element | string | null => {
  if (query.status === 'new') return null;

  // Display truncated raw query, if available
  let rawStr = query.lastExecuted || '';
  const rawLines = rawStr.split('\n');
  if (!rawLines[rawLines.length - 1]) rawLines.pop(); // ignore final newline
  if (rawLines.length > 4) {
    rawStr = `${rawLines.slice(0, 4).join('\n')}\n...`;
  }
  return rawStr;
};

export class QueryListItem extends React.Component<Props> {
  render(): JSX.Element {
    dbg('render', QueryListItem);
    const {query, activeQuery} = this.props;

    return (
      <div
        className="QueryListItem"
        style={{
          backgroundColor: '#fff',
          marginBottom: '1em',
          border: query.id === (activeQuery && activeQuery.id)
            ? '3px solid #edc'
            : '3px solid #fff',
        }}
        onClick={this.doSetActive}
      >
        <div>
          {query.title}
        </div>
        <small style={{display: 'block', paddingLeft: 20}}>
          <pre>
            {renderTruncatedRawQuery(query)}
          </pre>
          <pre>
            {renderTruncatedResults(query)}
          </pre>
        </small>
      </div>
    );
  }

  doSetActive = () => {
    this.props.setActiveQuery(this.props.query.id);
  };
}
