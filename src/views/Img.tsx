import * as React from 'react';

import {logger} from '../utils/logger';

const dbg = logger('Img', {count: ['render']});

export interface Props extends React.ClassAttributes<HTMLImageElement> {
  src: string;
  size: number;
  className?: string;
}

// This is horribly inefficient by rendering 3 images, but gets the intended effect.
// The bottom layer is necessary to prevent bleed-through from not being 100% opaque.
// TODO cache rendering with canvas
export class Img extends React.Component<Props> {
  render(): JSX.Element {
    dbg('render', this);
    const {src, size, className} = this.props;
    return (
      <div className={`Img pos-relative ${className || ''}`}>
        <img
          src={src}
          style={{
            width: size,
            height: size,
          }}
          className="pixelated"
        />
        <img
          src={src}
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
          src={src}
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
