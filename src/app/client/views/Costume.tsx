import * as React from 'react';
import * as k from '../constants';
import * as t from '../types';

import {Img} from './Img';
import {logger} from '../utils/log';
import {playerImagesById} from '../reducers';

const log = logger('Costume', {count: ['render']});

export interface Props extends React.HTMLProps<HTMLDivElement> {
  costume: t.Costume;
  familiar?: 'none' | 'left' | 'right';
  size?: number;
}

export class Costume extends React.PureComponent<Props> {
  static defaultProps = {
    familiar: 'none',
    size: k.renderedTileSize,
  };

  render(): JSX.Element {
    log('render', this);
    const {costume, familiar, size, ...rest} = this.props;

    // TODO want a better solution for this - it does nothing, but if we want `size` to be an optional prop we need
    // to let the type system know it's not undefined, because it doesn't know `defaultProps` provides a value
    const finalSize = size || k.renderedTileSize;

    const familiarImg = (
      <Img
        url={
          costume.felids
            ? `assets/${playerImagesById[costume.felids].url}`
            : null
        }
        size={finalSize / 2} // TODO better way?
      />
    );
    return (
      <div className="Costume" {...rest}>
        {familiar === 'left' ? familiarImg : null}
        <div
          style={{
            position: 'relative',
            width: finalSize,
            height: finalSize,
          }}
        >
          {k.categories.map(category => {
            if (category === t.CharacterCategory.felids) return null;
            const image =
              playerImagesById[costume[t.CharacterCategory[category]]];
            if (!image) return null;
            return (
              <Img
                key={category}
                url={`assets/${image.url}`}
                size={finalSize}
                style={{position: 'absolute', top: 0, left: 0}}
              />
            );
          })}
        </div>
        {familiar === 'right' ? familiarImg : null}
      </div>
    );
  }
}
