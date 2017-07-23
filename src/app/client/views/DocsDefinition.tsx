import * as React from 'react';

import {SchemaDefinition} from '../../../gen';
import {logger} from '../utils/log';

const log = logger('DocsDefinition', {count: ['render']});

export interface Props extends React.ClassAttributes<any> {
  def: SchemaDefinition;
}

// TODO expand from here
const DefType = ({def}: {def: SchemaDefinition}) =>
  <div>{JSON.stringify(def.type)}</div>;

export class DocsDefinition extends React.PureComponent<Props> {
  render(): JSX.Element {
    log('render', this);
    const {def} = this.props;
    return (
      <div className="DocsDefinition">
        <h4>{def.title}</h4>
        <DefType def={def} />
        {/*TODO make these helper components*/}
        {def.properties ? Object.keys(def.properties).join(' ⋅ ') : null}
        {def.code ? <pre>{def.code.declaration}</pre> : null}
      </div>
    );
  }
}
