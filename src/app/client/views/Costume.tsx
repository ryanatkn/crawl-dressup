import * as React from 'react';
import * as k from '../constants';
import * as t from '../types';

import {Img} from './Img';
import {logger} from '../utils/log';
import {playerImagesById} from '../reducers';

const log = logger('Costume', {count: ['render']});

export interface Props extends React.HTMLProps<HTMLDivElement> {
  costume: t.Costume;
  flipFamiliar?: boolean;
}

export class Costume extends React.PureComponent<Props> {
  static defaultProps = {
    flipFamiliar: false,
  };

  render(): JSX.Element {
    log('render', this);
    const {costume, flipFamiliar, ...rest} = this.props;
    const familiar = (
      <Img
        url={
          costume.felids
            ? `assets/${playerImagesById[costume.felids].url}`
            : null
        }
        size={k.renderedTileSize}
      />
    );
    return (
      <div className="Costume" {...rest}>
        {flipFamiliar ? null : familiar}
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
        {flipFamiliar ? familiar : null}
      </div>
    );
  }
}
