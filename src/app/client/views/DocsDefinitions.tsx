import * as React from 'react';

import {Clay} from '../../../gen';
import {DocsDefinition} from './DocsDefinition';
import {Frame} from './Frame';
import {logger} from '../utils/log';

const log = logger('DocsDefinitions', {count: ['render']});

export interface Props extends React.ClassAttributes<any> {
  clay: Clay;
}

export class DocsDefinitions extends React.PureComponent<Props> {
  render(): JSX.Element {
    log('render', this);
    const {clay} = this.props;
    const indexId = `docs-defs-index-${clay.name}`;
    return (
      <div className="DocsDefinitions">
        <Frame>
          <h3 id={indexId}>definitions</h3>
          <ul>
            {Object.keys(clay.definitions).map(d =>
              <li key={d}><a href={`#doc-def-${d}`}>{d}</a></li>,
            )}
          </ul>
          {Object.keys(clay.definitions).map(d =>
            <Frame key={d} id={`doc-def-${d}`}>
              <DocsDefinition key={d} def={clay.definitions[d]} />
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <a href={`#${indexId}`}>^</a>
              </div>
            </Frame>,
          )}
        </Frame>
      </div>
    );
  }
}
