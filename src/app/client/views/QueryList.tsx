import * as React from 'react';
import * as t from '../types';

import {QueryListItem} from './QueryListItem';
import {QueryListNewItem} from './QueryListNewItem';
import {logger} from '../utils/log';

const log = logger('QueryList', {count: ['render']});

export interface Props extends React.ClassAttributes<any> {
  queries: t.Query[];
  activeQuery: t.Query | undefined;
  createQuery(): void;
  setActiveQuery(id: string): void;
}

export const QueryList = ({
  queries,
  activeQuery,
  createQuery,
  setActiveQuery,
}: Props): JSX.Element => {
  log('render', QueryList);
  return (
    <div className="QueryList">
      <div>
        <QueryListNewItem createQuery={createQuery} />
        {queries.map(q =>
          <QueryListItem
            key={q.id}
            query={q}
            active={q === activeQuery}
            setActive={setActiveQuery}
          />,
        )}
      </div>
    </div>
  );
};
