import * as React from 'react';

import {AppDef} from '../../../gen';
import {DocsDefinitions} from './DocsDefinitions';
import {logger} from '../utils/log';

const log = logger('Docs', {count: ['render']});

export interface Props extends React.ClassAttributes<any> {
  def: AppDef;
}

export class Docs extends React.PureComponent<Props> {
  render(): JSX.Element {
    log('render', this);
    const {def} = this.props;
    return (
      <div className="Docs">
        <h2>docs</h2>
        <DocsDefinitions def={def} />
      </div>
    );
  }
}
