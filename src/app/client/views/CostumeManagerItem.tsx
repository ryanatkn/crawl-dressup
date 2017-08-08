import * as React from 'react';
import * as k from '../constants';
import * as t from '../types';

import {Img} from './Img';
import {logger} from '../utils/log';
import {playerImagesById} from '../reducers';

const log = logger('CostumeManagerItem', {count: ['render']});

export interface Props extends React.HTMLProps<HTMLDivElement> {
  costume: t.Costume;
  category: t.CharacterCategory;
  size?: number;
  removeItem(costumeId: t.Id, category: t.CharacterCategory): void;
}

export class CostumeManagerItem extends React.PureComponent<Props> {
  static defaultProps = {
    size: k.renderedTileSize,
  };

  render(): JSX.Element | null {
    log('render', this);
    // TODO awkwardly have to pull `removeItem` off to avoid sending it to the div... hrmm
    // consider a more standardized way to do `rest` props on every component
    const {costume, category, size, removeItem, ...rest} = this.props;

    // TODO want a better solution for this - it does nothing, but if we want `size` to be an optional prop we need
    // to let the type system know it's not undefined, because it doesn't know `defaultProps` provides a value
    const finalSize = size || k.renderedTileSize;

    const image = playerImagesById[costume[t.CharacterCategory[category]]];
    if (!image) return null;

    return (
      <div className="CostumeManagerItem" {...rest} onClick={this.doClick}>
        <Img url={`assets/${image.url}`} size={finalSize} />
      </div>
    );
  }

  doClick = () => {
    this.props.removeItem(this.props.costume.id, this.props.category);
  };
}
