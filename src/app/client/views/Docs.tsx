import * as React from 'react';

import {Clay} from '../../../gen';
import {DocsDefinitions} from './DocsDefinitions';
import {logger} from '../utils/log';

const log = logger('Docs', {count: ['render']});

export interface Props extends React.ClassAttributes<any> {
  clay: Clay;
}

export class Docs extends React.PureComponent<Props> {
  render(): JSX.Element {
    log('render', this);
    const {clay} = this.props;
    return (
      <div className="Docs">
        <h2>docs</h2>
        <DocsDefinitions clay={clay} />
      </div>
    );
  }
}
