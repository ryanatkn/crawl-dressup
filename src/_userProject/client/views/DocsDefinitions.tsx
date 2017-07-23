import * as React from 'react';

import {AppDef} from '../../../gen';
import {DocsDefinition} from './DocsDefinition';
import {Frame} from './Frame';
import {logger} from '../utils/log';

const log = logger('DocsDefinitions', {count: ['render']});

export interface Props extends React.ClassAttributes<any> {
  def: AppDef;
}

export class DocsDefinitions extends React.PureComponent<Props> {
  render(): JSX.Element {
    log('render', this);
    const {def} = this.props;
    const indexId = `docs-defs-index-${def.name}`;
    return (
      <div className="DocsDefinitions">
        <Frame>
          <h3 id={indexId}>definitions</h3>
          <ul>
            {Object.keys(def.definitions).map(d =>
              <li key={d}><a href={`#doc-def-${d}`}>{d}</a></li>,
            )}
          </ul>
          {Object.keys(def.definitions).map(d =>
            <Frame key={d} id={`doc-def-${d}`}>
              <DocsDefinition key={d} def={def.definitions[d]} />
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
