import * as React from 'react';
import * as t from '../types';

import {AppDef} from '../../../gen';
import {Frame} from './Frame';
import {logger} from '../utils/log';

const log = logger('StateInspector', {count: ['render']});

export interface Props extends React.ClassAttributes<any> {
  state: t.ClientState;
  def: AppDef;
}

export class StateInspector extends React.PureComponent<Props> {
  render(): JSX.Element {
    log('render', this);
    const {state} = this.props;
    return (
      <div className="StateInspector">
        <h2>state inspector</h2>
        <Frame>
          <pre>
            {JSON.stringify(state, null, 2)}
          </pre>
        </Frame>
      </div>
    );
  }
}
