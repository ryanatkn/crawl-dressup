import * as React from 'react';

import {logger} from '../utils/log';

const log = logger('QueryListNewItem', {count: ['render']});

export interface Props extends React.ClassAttributes<any> {
  createQuery(): void;
}

export const QueryListNewItem = ({createQuery}: Props): JSX.Element => {
  log('render', QueryListNewItem);
  return (
    <div
      className="QueryListNewItem"
      style={{
        backgroundColor: '#fff',
        marginBottom: '1em',
        border: '3px solid #fff',
      }}
    >
      <div onClick={createQuery}>
        + new query
      </div>
    </div>
  );
};
