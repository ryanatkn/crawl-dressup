import * as React from 'react';
import * as k from '../constants';
import * as t from '../types';

import {logger} from '../utils/log';
import {CostumeManagerItem} from './CostumeManagerItem';

const log = logger('CostumeManager', {count: ['render']});

export interface Props extends React.HTMLProps<HTMLDivElement> {
  costume: t.Costume;
  size?: number;
  removeItem(costumeId: t.Id, category: t.CharacterCategory): void;
}

export class CostumeManager extends React.PureComponent<Props> {
  static defaultProps = {
    size: k.renderedTileSize,
  };

  render(): JSX.Element {
    log('render', this);
    const {costume, size, removeItem, ...rest} = this.props;

    return (
      <div className="CostumeManager" {...rest}>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {k.categories.map(category =>
            <CostumeManagerItem
              key={category}
              costume={costume}
              category={category}
              size={size}
              removeItem={removeItem}
            />,
          )}
        </div>
      </div>
    );
  }
}
