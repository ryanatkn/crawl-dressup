import * as React from 'react';
import * as k from '../constants';
import * as t from '../types';

import {Img} from './Img';
import {logger} from '../utils/log';
import {playerImagesById} from '../reducers';

const log = logger('Costume', {count: ['render']});

export interface Props extends React.HTMLProps<HTMLDivElement> {
  costume: t.Costume;
}

export class Costume extends React.PureComponent<Props> {
  render(): JSX.Element {
    log('render', this);
    const {costume, ...rest} = this.props;
    return (
      <div className="Costume" {...rest}>
        {
          <Img
            url={
              costume.felids
                ? `assets/${playerImagesById[costume.felids].url}`
                : null
            }
            size={k.renderedTileSize}
          />
        }
        <div
          style={{
            position: 'relative',
            width: k.renderedTileSizeLg,
            height: k.renderedTileSizeLg,
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
                size={k.renderedTileSizeLg}
                style={{position: 'absolute', top: 0, left: 0}}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
