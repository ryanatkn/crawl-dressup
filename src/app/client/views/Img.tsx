import * as React from 'react';

import {logger} from '../utils/log';

const log = logger('Img', {count: ['render']});

export interface Props extends React.HTMLProps<HTMLDivElement> {
  url: string | null;
  size: number;
  className?: string;
}

// This is horribly inefficient by rendering 3 images, but gets the intended effect.
// The bottom layer is necessary to prevent bleed-through from not being 100% opaque.
// TODO cache rendering with canvas
export class Img extends React.PureComponent<Props> {
  render(): JSX.Element | null {
    log('render', this);
    const {url, size, className, ...rest} = this.props;
    if (!url) return null;
    return (
      <div className={`Img pos-relative ${className || ''}`} {...rest}>
        <img
          src={url}
          style={{
            width: size,
            height: size,
          }}
          className="pixelated"
        />
        <img
          src={url}
          style={{
            width: size,
            height: size,
            opacity: 0.55,
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        />
        <img
          src={url}
          style={{
            width: size,
            height: size,
            opacity: 0.77,
            position: 'absolute',
            left: 0,
            top: 0,
          }}
          className="pixelated"
        />
      </div>
    );
  }
}
